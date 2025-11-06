import { PostHtml } from "../../types/post";
import styles from "./post-list.module.css";
import PostCard from "./post-card";

const PostList = ({ posts }: { posts: PostHtml[] }) => {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
