import Fuse from "fuse.js";
import { PostMeta } from "../../types/post";

const searchPosts = (posts: PostMeta[], query: string) => {
  const fuse = new Fuse(posts, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "description", weight: 0.2 },
      { name: "contentMd", weight: 0.1 },
      { name: "tags", weight: 0.2 },
    ],
    threshold: 0.45,
    minMatchCharLength: 1,
    ignoreLocation: true,
  });

  return fuse.search(query).map((r) => r.item);
};

export default searchPosts;
