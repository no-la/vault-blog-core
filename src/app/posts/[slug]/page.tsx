import { getAllSlugs, getPostBySlug } from "@/lib/blog-utils";
import { PostSlug } from "@/types/post";

export const generateStaticParams = (): { slug: PostSlug }[] => {
  return getAllSlugs().map((slug) => ({ slug }));
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: PostSlug }>;
}) {
  console.log("Generating static params for blog posts", await params);
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return (
    <div>
      <div>
        <p>投稿日:{post.createdAt.toDateString()}</p>
        <p>投稿日:{post.updatedAt.toDateString()}</p>
        <ul>
          {post.tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
        <h1>{post.title}</h1>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
}
