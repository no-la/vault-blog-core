export const embedSourceWikiLinksRegex = (exts: string[]): RegExp => {
  return new RegExp(embedSourceWikiLinkRegex(exts), "g");
};

export const embedSourceWikiLinkRegex = (exts: string[]): RegExp => {
  return new RegExp(`!\\[\\[(.+?)\\.(${exts.join("|")})\\]\\]`);
};

export const sourceWikiLinkRegex = (exts: string[]): RegExp => {
  return new RegExp(`\\[\\[(.+?)\\.(${exts.join("|")})\\]\\]`);
};

export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
