// for test
import MarkdownIt from "markdown-it";

export function installTokenDumper(md: MarkdownIt) {
  md.core.ruler.push("dump-fence-tokens", (state) => {
    for (let i = 0; i < state.tokens.length; i++) {
      const t = state.tokens[i];
      if (t.type === "fence") {
        // 周辺 3 トークンを表示
        const slice = state.tokens.slice(
          Math.max(0, i - 3),
          Math.min(state.tokens.length, i + 4)
        );
        console.log("=== fence at", i, " ===");
        slice.forEach((tok, idx) => {
          console.log(idx + (i - 3), tok.type, {
            tag: tok.tag,
            contentSnippet: (tok.content || "").slice(0, 80),
          });
        });
      }
    }
  });
}
