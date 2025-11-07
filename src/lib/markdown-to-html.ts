import { ConvertingMarkdown } from "./convert-markdown-utils";

export const markdownToHtml = async (markdown: string): Promise<string> => {
  return new ConvertingMarkdown(markdown).executeAll();
};
