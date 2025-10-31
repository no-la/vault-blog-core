export type PostMd = {
  slug: string;
  content: string;
  frontMatter?: {
    title?: string;
    date?: string;
    tags?: string[];
    published: boolean;
  };
};
