import { getAllSlugs, getPaginatedPosts } from "@/lib/blog-utils";
import PaginatedPosts from "@/component/paginated-posts";
import { POST_PER_PAGE } from "@/config/pagination";

export const generateStaticParams = (): { page: string }[] => {
  const pageNum = Math.ceil(getAllSlugs().length / POST_PER_PAGE);
  return [...Array(pageNum).keys()].map((page) => ({
    page: "" + (page + 1),
  }));
};

export default async function BlogPost({
  params,
}: {
  params: { page: string };
}) {
  const page = parseInt((await params).page);
  const posts = await getPaginatedPosts(page, POST_PER_PAGE);

  return (
    <PaginatedPosts
      posts={posts}
      page={page}
      totalPages={Math.ceil(getAllSlugs().length / POST_PER_PAGE)}
    />
  );
}
