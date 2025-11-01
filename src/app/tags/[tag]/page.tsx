export default async function TagPage({ params }: { params: { tag: string } }) {
  return <div>Tag: {(await params).tag}</div>;
}
