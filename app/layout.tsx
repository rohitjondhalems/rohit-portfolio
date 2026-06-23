import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rohit Bhimrao Jondhale | AI/ML Engineer",
  description: "AI/ML Engineer specializing in GenAI, LLMOps, RAG, and Agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning prevents browser extensions from triggering React hydration errors
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}