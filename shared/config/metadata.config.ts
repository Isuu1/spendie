import { Metadata } from "next";

const baseUrl = "https://jakubb12@gmail.com/";

export const siteMetadata: Metadata = {
  // Set the base URL for resolving paths
  metadataBase: new URL(baseUrl),
  title: "Spendie | Personal Finance Management App",
  description:
    "Spendie is a personal finance management app that helps you track your expenses and manage your budget.",
  keywords: [
    "personal finance",
    "budgeting",
    "expense tracking",
    "financial management",
    "money management",
    "spending tracker",
    "budget planner",
    "financial planning",
    "savings tracker",
    "financial goals",
  ],
  authors: [{ name: "Jakub Babelek", url: "https://github.com/Isuu1" }],
  creator: "Jakub Babelek",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon/favicon.ico",
    // Link to the Apple touch icon (iOS home screen)
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    // Link to other icons if needed (e.g., for Android Chrome manifest)
    other: [
      {
        rel: "icon",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  // === Open Graph (for Social Media Previews - Facebook, LinkedIn, etc.) ===
  openGraph: {
    title: "Spendie | Personal Finance Management App", // Can be the same as the main title or slightly adapted
    description:
      "Spendie is a personal finance management app that helps you track your expenses and manage your budget.", // Can be the same or a slightly shorter version of the main description
    url: baseUrl,
    siteName: "Spendie",
    images: [
      {
        url: "/images/open-graph-preview.png",
        width: 1200,
        height: 665,
        alt: "Preview image for Spendie",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  // === Twitter Card (for Twitter Previews) ===
  twitter: {
    card: "summary_large_image", //Use 'summary_large_image' for a more visual preview
    title: "Spendie | Personal Finance Management App",
    description:
      "Spendie is a personal finance management app that helps you track your expenses and manage your budget.",
    images: ["/images/open-graph-preview.png"],
  },

  // === Other Metadata ===
  robots: {
    // Instructions for web crawlers
    index: true, // Allow indexing by search engines
    follow: true, // Allow following links
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};
