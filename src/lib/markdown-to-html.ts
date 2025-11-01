import markdownit from "markdown-it";

export const markdownToHtml = async (markdown: string): Promise<string> => {
  const result = new Markdown(markdown)
    .convertWikiLinks()
    .mdRender()
    .toString();
  return result;
};

class Markdown {
  constructor(private content: string) {}

  toString(): string {
    return this.content;
  }

  mdRender(): Markdown {
    const md = markdownit();
    this.content = md.render(this.toString());
    return this;
  }

  convertWikiLinks(): Markdown {
    this.content = this.content.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
      const parts = p1.split("|");
      const linkText = parts[1] || parts[0];
      const linkHref = parts[0].replace(/ /g, "-").toLowerCase();
      return `[${linkText}](/posts/${linkHref})`;
    });
    return this;
  }
}
