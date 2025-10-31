const posts: Record<string, { title: string; content: string }> = {
  cat: { title: "All About Cats", content: "Cats are great pets." },
  dog: { title: "All About Dogs", content: "Dogs are loyal friends." },
  bird: { title: "All About Birds", content: "Birds can fly high." },
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      <div>slug is {(await params).slug}</div>
    </article>
  );
}
