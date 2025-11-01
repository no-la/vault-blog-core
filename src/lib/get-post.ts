import { PostMd } from "../types/post";
import { markdownToHtml } from "./markdown-to-html";
import * as fs from "fs";
import matter from "gray-matter";

export const getPost = async (slug: string): Promise<string> => {
  const posts = await getPostMdArray();
  const post = posts.find((post) => post.slug === slug);
  if (!post) {
    return "Not Found";
  }
  return markdownToHtml(post.content);
};

export const getAllPostSlugs = async (): Promise<{ slug: string }[]> => {
  return (await getPostMdArray()).map((post) => ({ slug: post.slug }));
};

const getPostMdArray = async (): Promise<PostMd[]> => {
  const dirPath = "posts";
  const fileNames = fs.readdirSync(dirPath);
  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(".md", "");
      const entireContent = fs.readFileSync(`posts/${fileName}`, "utf-8");
      const { content, data } = matter(entireContent);
      return { slug, content, data };
    })
    .filter((post) => post.data.published)
    .map((post) => ({
      slug: post.slug,
      content: post.content,
      frontMatter: {
        title: post.data.title,
        date: post.data.date,
        tags: post.data.tags,
        published: post.data.published,
      },
    }));
};
