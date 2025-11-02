const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

require("dotenv").config();

const SOURCE_DIR = process.env.POSTS_SOURCE_DIR;
const IMAGE_SOURCE_DIR = process.env.IMAGE_SOURCE_DIR;
if (!SOURCE_DIR) {
  console.error("Not Found SOURCE_DIR env");
  process.exit(1);
}
if (!IMAGE_SOURCE_DIR) {
  console.error("Not Found IMAGE_SOURCE_DIR env");
  process.exit(1);
}
const DEST_DIR = "posts"; // NOTE: must be same with config.DEST_DIR
const POST_ASSET_DEST_DIR = "public/post-assets"; // NOTE: must be same with config.POST_SSET_DEST_DIR
let titleToSlug = {};
let slugToTitle = {};

const getMdDatas = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return matter(fileContent);
};
const isValidSlug = (slug) => /^[a-z0-9-]+$/.test(slug);
const collectImageFiles = (content) => {
  const matches = content.matchAll(/\!\[\[(.+?)\.(png|jpe?g)\]\]/gi);

  for (const match of matches) {
    const p1 = match[1];
    const ext = match[2];
    const parts = p1.split("|");
    const fileName = `${parts[0]}.${ext}`;
    const srcPath = path.join(IMAGE_SOURCE_DIR, fileName);
    const destPath = path.join(POST_ASSET_DEST_DIR, encodeForURI(fileName));

    if (!fs.existsSync(srcPath)) {
      console.warn(`Not Found: Image ${srcPath} is not found.`);
      continue;
    }
    if (fs.existsSync(destPath)) {
      continue;
    }

    const { size } = fs.statSync(srcPath);
    const sizeMB = size / (1024 * 1024);
    if (sizeMB > 1) {
      console.warn(`Large image (${sizeMB.toFixed(2)} MB): ${srcPath}`);
    }

    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.cpSync(srcPath, destPath);
  }
};
const initImageDestDir = () => {
  fs.rmSync(POST_ASSET_DEST_DIR, { recursive: true, force: true });
  fs.mkdirSync(POST_ASSET_DEST_DIR, { recursive: true });
};
const initPostsDestDir = () => {
  fs.rmSync(DEST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DEST_DIR, { recursive: true });
};
const encodeForURI = (text) => {
  return encodeURIComponent(text.replace(/\s/g, "-"));
};

const main = () => {
  initPostsDestDir();
  initImageDestDir();

  // SOURCE_DIR 内の全アイテムを DEST_DIR にコピー
  fs.readdirSync(SOURCE_DIR).forEach((item) => {
    const srcPath = path.join(SOURCE_DIR, item);
    const destPath = path.join(DEST_DIR, item);

    // validate front matter
    const { data, content } = getMdDatas(srcPath);
    if (!data.published) {
      console.log(`Skipping unpublished post: ${item}`);
      return;
    }
    if (!data.slug) {
      console.warn(`Warning: Post "${item}" is missing a slug. Skipping.`);
      return;
    }
    if (!isValidSlug(data.slug)) {
      console.warn(`Warning: Post "${item}" has unvalid slug. Skipping.`);
      return;
    }

    const title = item.replace(".md", "");
    slugToTitle[data.slug] = title;
    titleToSlug[title] = data.slug;

    collectImageFiles(content);
    fs.cpSync(srcPath, destPath, { recursive: true });
  });

  const DATA_DIR = "src/data";
  fs.writeFileSync(
    fs.openSync(path.join(DATA_DIR, "slug-to-title.json"), "w"),
    JSON.stringify(slugToTitle, null, 2)
  );
  fs.writeFileSync(
    fs.openSync(path.join(DATA_DIR, "title-to-slug.json"), "w"),
    JSON.stringify(titleToSlug, null, 2)
  );
};

main();
