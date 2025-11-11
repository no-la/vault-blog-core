import { Metadata } from "next";

export const DEFAULT_METADATA: Metadata = {
  title: "Vault Blog Core",
  description: "Markdownファイル群をブログとして公開するためのテンプレート",
  openGraph: {
    title: "Vault Blog Core",
    description: "Markdownファイル群をブログとして公開するためのテンプレート",
    images: [
      {
        url: "/images/ogp-main.jpg", // 🌟 静的画像の指定
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const gnerateMetadataTitle = (title: string): string => {
  return title ? `${title} | Vault Blog Core` : "Vault Blog Core";
};
