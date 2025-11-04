// Set your condition to publish posts
// ---
// Args:
//   filePath: string
//   parsedFrontMatter: object
// Return: boolean
//
// --- Example ---
// Args:
//   filePath = "C:/user/obsidian/vault/sample.md"
//   parsedFrontMatter = {
//     slug: true,
//     createdAt: 2000/1/1,
//     tags: ["tag1", "tag2"],
//     thumbnail: "[[sample.jpg]]",
//     description: "This is sample data",
//     published: true,
//     yourProperty: "foobar",
//     yourProperty2: 123,
//     ...
//   }
// Return: true or false

const canPublish = (parsedFrontMatter) => {
  return parsedFrontMatter.published;
};

module.exports = {
  canPublish,
};
