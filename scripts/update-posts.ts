const fs = require("fs");
const path = require("path");

const SOURCE_DIR = "I:/Obsidian/NolaBlogTest/NolaBlog";
const DEST_DIR = "posts";

console.log("Start Updating Posts");

// posts ディレクトリを削除して再作成
fs.rmSync(DEST_DIR, { recursive: true, force: true });
fs.mkdirSync(DEST_DIR, { recursive: true });

// SOURCE_DIR 内の全アイテムを DEST_DIR にコピー
fs.readdirSync(SOURCE_DIR).forEach((item: string) => {
  const srcPath = path.join(SOURCE_DIR, item);
  const destPath = path.join(DEST_DIR, item);

  fs.cpSync(srcPath, destPath, { recursive: true });
});

console.log("Posts Updated");
