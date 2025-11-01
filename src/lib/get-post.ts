import { PostMd, SlugTitleMap } from "../types/post";
import { markdownToHtml } from "./markdown-to-html";
import * as fs from "fs";
import matter from "gray-matter";
import slugToTitleJson from "../data/slug-to-title.json";

const slugToTitle: SlugTitleMap = slugToTitleJson;
const DIR_PATH = "posts";

export const getPost = async (slug: string): Promise<string> => {
  if (!(slug in slugToTitle)) {
    return "Not Found";
  }
  const post = getPostMd(slug, slugToTitle[slug]);
  return markdownToHtml(post.content);
};

export const getAllPostSlugs = async (): Promise<{ slug: string }[]> => {
  return Object.keys(slugToTitle).map((slug) => ({ slug: slug }));
};

const getPostMd = (slug: string, title: string): PostMd => {
  const entireContent = fs.readFileSync(`${DIR_PATH}/${title}.md`, "utf-8");
  const { content, data } = matter(entireContent);
  return {
    slug: slug,
    content: content,
    frontMatter: {
      title: data.title,
      date: data.date,
      tags: data.tags,
      published: data.published,
    },
  };
};
