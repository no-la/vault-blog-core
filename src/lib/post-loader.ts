import { PostHtml, PostMd, PostMeta } from "../types/post";
import { markdownToHtml } from "./markdown-to-html";
import * as fs from "fs";
import matter from "gray-matter";
import { getAllPostSlugs, slugToTitle } from "./slug-map";
import { POSTS_DIR } from "@/config/path";
import { existsPublicFile, publicFileNameToUrl } from "./public-files";

export const getPost = async (slug: string): Promise<PostHtml> => {
  const postMd = getPostMd(slug, slugToTitle(slug));
  const contentHtml = await markdownToHtml(postMd.contentMd);
  const postHtml: PostHtml = {
    ...postMd,
    ...{
      contentHtml: contentHtml,
      description: generateDescription(postMd, contentHtml),
    },
  };
  return postHtml;
};

const getPostMd = (slug: string, title: string): PostMd => {
  const entireContent = fs.readFileSync(`${POSTS_DIR}/${title}.md`, "utf-8");
  const { content, data } = matter(entireContent);
  return {
    slug: slug,
    title: title,
    contentMd: content,
    tags: data.tags ?? [],
    description: data.description,
    thumbnail: convertThumbnailPath(data.thumbnail),
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    published: data.published,
  };
};

const convertThumbnailPath = (thumbnailFm: string): string | null => {
  if (!thumbnailFm) {
    return null;
  }

  const regex = new RegExp(`\\[\\[(.+?)\\.(png|jpg|gif)\\]\\]`);
  const match = thumbnailFm.match(regex);

  if (!match) {
    return null;
  }

  const p1 = match[1];
  const ext = match[2];
  const parts = p1.split("|");
  const fileName = `${parts[0]}.${ext}`;

  if (!existsPublicFile(fileName)) {
    return null;
  }
  return publicFileNameToUrl(fileName);
};

const generateDescription = (
  postMd: PostMeta,
  contentHtml: string,
  maxLength = 200
): string => {
  if (postMd.description) {
    return postMd.description;
  }

  const textContent = contentHtml.replace(/<[^>]+>/g, "");
  const cleanText = textContent.replace(/\s+/g, " ").trim();

  if (cleanText.length > maxLength) {
    return cleanText.slice(0, maxLength) + "...";
  }
  return cleanText;
};

export const getAllPostMetas = (): PostMeta[] => {
  const allSlugs = getAllPostSlugs();
  return allSlugs.map((slug) => getPostMd(slug, slugToTitle(slug)));
};
