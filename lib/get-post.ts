import { markdownToHtml } from "./markdown-to-html";

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

const getPostMdArray = async () => {
  return [
    { slug: "cat", content: "# All About Cats\nCats are great pets." },
    { slug: "dog", content: "# All About Dogs\nDogs are loyal friends." },
    { slug: "bird", content: "# All About Birds\nBirds can fly high." },
  ];
};
