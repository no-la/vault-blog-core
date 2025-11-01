import { POSTS_DIR } from "@/config/path";
import { getAllPostMetas } from "@/lib/post-loader";
import { slugToTitle } from "@/lib/slug-map";

export default function Posts() {
  const postMetas = getAllPostMetas();
  return (
    <div>
      <h1>投稿一覧</h1>
      <div>
        <ul>
          {postMetas.map((pm) => {
            return (
              <li key={pm.slug}>
                <a href={`${POSTS_DIR}/${pm.slug}`}>{slugToTitle(pm.slug)}</a>
                <p>{pm.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
