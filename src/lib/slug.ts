import { SlugTitleMap } from "@/types/post";
import _slugToTitleJson from "../data/slug-to-title.json";

const SLUG_TO_TITLE: SlugTitleMap = _slugToTitleJson;

export const slugToTitle = (slug: string): string => {
  if (!(slug in SLUG_TO_TITLE)) {
    throw new Error(`Not Found: slug ${slug}`);
  }
  return SLUG_TO_TITLE[slug];
};
