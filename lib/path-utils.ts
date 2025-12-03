import * as fs from "fs";
import path from "path";
import { POST_ASSET_DEST_DIR, POSTS_DIR, PUBLIC_DIR } from "../config/path";

export const existsPostAsset = (fileName: string): boolean => {
  return fs.existsSync(path.join(POST_ASSET_DEST_DIR, fileName));
};

/**
 * Markdownファイル関連
 */
export const getPostMdFilePath = (filename: string) =>
  path.join(POSTS_DIR, `${filename}`);

export const getRssFilePath = () => path.join(PUBLIC_DIR, "feed.xml");
