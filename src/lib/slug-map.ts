import { PostSlug, SlugFilenameMap } from "../../types/post";
import _slugToFilenameJson from "../../data/slug-to-filename.json";
import _filenameToSlugJson from "../../data/filename-to-slug.json";

const SLUG_TO_FILENAME: SlugFilenameMap = _slugToFilenameJson;
const FILENAME_TO_SLUG: SlugFilenameMap = _filenameToSlugJson;

export const slugToFilename = (slug: PostSlug): string => {
  if (!(slug in SLUG_TO_FILENAME)) {
    throw new Error(`Not Found: slug ${slug}`);
  }
  return SLUG_TO_FILENAME[slug];
};

export const filenameToSlug = (filename: string): PostSlug => {
  if (!(filename in FILENAME_TO_SLUG)) {
    throw new Error(`Not Found: filename ${filename}`);
  }
  return FILENAME_TO_SLUG[filename];
};

export const existsSlug = (slug: PostSlug): boolean => {
  return slug in SLUG_TO_FILENAME;
};

export const existsFilename = (filename: string): boolean => {
  return filename in FILENAME_TO_SLUG;
};

export const getAllPostSlugs = (): PostSlug[] => {
  return Object.keys(SLUG_TO_FILENAME);
};
