import { PostMeta } from "../../types/post";
import styles from "./post-list.module.css";
import PostCard from "./post-card";

const PostList = ({ posts }: { posts: PostMeta[] }) => {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.slug} className={styles.item}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
