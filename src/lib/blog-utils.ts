import { PostHtml, PostTag } from "../../types/post";
import { getPostHtml } from "./post-loader";
import { getAllPostSlugs } from "./slug-map";
import {
  getAllPostTags,
  getPostCountByPostTag,
  getPostSlugsByPostTag,
} from "./tag-map";

// ===== posts =====
export const getAllPostsSortedByCreatedAt = async (
  options: {
    oldToNew?: boolean;
  } = { oldToNew: false }
): Promise<PostHtml[]> => {
  const allSlugs = getAllSlugs();
  const posts: PostHtml[] = [];
  for (const slug of allSlugs) {
    const post = await getPostHtml(slug);
    posts.push(post);
  }
  // sorted by createdAt
  // new to old
  return posts.sort(
    (a, b) =>
      (options.oldToNew ? -1 : 1) *
      (b.createdAt.getTime() - a.createdAt.getTime())
  );
};
export const getPostBySlug = async (slug: string): Promise<PostHtml> => {
  return await getPostHtml(slug);
};
export const getPaginatedPosts = async (
  page: number, // 1-indexed
  limit: number,
  { oldToNew }: { oldToNew?: boolean } = { oldToNew: false }
): Promise<PostHtml[]> => {
  const allPosts = await getAllPostsSortedByCreatedAt({ oldToNew });
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return allPosts.slice(startIndex, endIndex);
};
export const getAdjacentPosts = async (
  slug: string
): Promise<{ prev: PostHtml | null; next: PostHtml | null }> => {
  const allPosts = await getAllPostsSortedByCreatedAt();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);

  const prev = allPosts[currentIndex + 1] ?? null;
  const next = allPosts[currentIndex - 1] ?? null;

  return { prev, next };
};
export const getRelatedPosts = async (post: PostHtml): Promise<PostHtml[]> => {
  const postsArray = await Promise.all(
    post.tags.map(async (tag) => getPostsByTag(tag))
  );

  const allPosts = postsArray.flat().filter((p) => p.slug !== post.slug);

  // slugで重複を除外
  const uniquePosts = Array.from(
    new Map(allPosts.map((p) => [p.slug, p])).values()
  );

  return uniquePosts;
};
export const getAllSlugs = (): string[] => {
  return getAllPostSlugs();
};
export const getRecentPosts = async (limit: number): Promise<PostHtml[]> => {
  const allPosts = await getAllPostsSortedByCreatedAt();
  return allPosts.slice(0, limit);
};

// ===== tags =====
export const getAllTags = (): PostTag[] => {
  return getAllPostTags();
};
export const getPostsByTag = async (
  tag: PostTag,
  options: { oldToNew?: boolean } = { oldToNew: false }
): Promise<PostHtml[]> => {
  const posts = await Promise.all(
    getPostSlugsByPostTag(tag).map(async (slug) => await getPostHtml(slug))
  );
  posts.sort(
    (a, b) =>
      (options.oldToNew ? -1 : 1) *
      (b.createdAt.getTime() - a.createdAt.getTime())
  );
  return posts;
};
export const getPostCountByTag = (tag: PostTag): number => {
  return getPostCountByPostTag(tag);
};
