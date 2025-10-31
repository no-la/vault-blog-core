const posts: Record<string, { title: string; content: string }> = {
  cat: { title: "All About Cats", content: "Cats are great pets." },
  dog: { title: "All About Dogs", content: "Dogs are loyal friends." },
  bird: { title: "All About Birds", content: "Birds can fly high." },
};

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  return Object.keys(posts).map((slug) => ({ slug }));
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  console.log("Generating static params for blog posts", await params);
  const { slug } = await params;
  const post = posts[slug];
  if (!post) {
    return <div>Not Found</div>;
  }
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      <div>slug is {(await params).slug}</div>
    </article>
  );
}
