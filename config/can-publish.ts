/**
 * 投稿を公開してよいかを判定する関数
 *
 * @param parsedFrontMatter - フロントマターの内容
 * @returns 投稿を公開する場合は true、それ以外は false
 *
 * @example
 * const parsedFrontMatter = {
 *   slug: "sample",
 *   createdAt: "2000-01-01",
 *   tags: ["tag1", "tag2"],
 *   thumbnail: "[[sample.jpg]]",
 *   description: "This is sample data",
 *   published: true,
 *   customField: "foobar",
 * };
 *
 * const result = canPublish(parsedFrontMatter); // true
 */
export const canPublish = (
  parsedFrontMatter: Record<string, unknown>
): boolean => {
  const val = parsedFrontMatter.published;
  return typeof val === "boolean" && val === true;
};
