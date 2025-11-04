import { PostHtml } from "@/types/post";
import { getPost } from "./post-loader";

// ===== posts =====
export const getAllPosts = async (): Promise<PostHtml[]> => {
  const allSlugs = getAllSlugs();
  const posts: PostHtml[] = [];
  for (const slug of allSlugs) {
    const post = await getPost(slug);
    posts.push(post);
  }
  return posts;
};
export const getPostBySlug = async (slug: string): Promise<PostHtml> => {
  return await getPost(slug);
};
export const getPaginatedPosts = async (
  page: number, // 1-indexed
  limit: number
): Promise<PostHtml[]> => {
  const allPosts = await getAllPosts();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return allPosts.slice(startIndex, endIndex);
};
export const getAdjacentPosts = async (slug: string): Promise<PostHtml[]> => {
  /* ... */
};
export const getRelatedPosts = async (tags: string[]): Promise<PostHtml[]> => {
  /* ... */
};
export const getAllSlugs = (): string[] => {
  /* ... */
};
export const getRecentPosts = async (limit: number): Promise<PostHtml[]> => {
  /* ... */
};

// ===== tags =====
export const getAllTags = async () => {
  /* ... */
};
export const getPostsByTag = async (tag: string) => {
  /* ... */
};
export const getPostCountByTag = async () => {
  /* ... */
};

// ===== about =====
export const getSiteConfig = async () => {
  /* ... */
};
export const getSiteMetadata = async () => {
  /* ... */
};

// ===== common =====
export const getPublicAssetUrl = (fileName: string) => {
  /* ... */
};
