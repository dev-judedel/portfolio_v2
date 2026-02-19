import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jude Dela Cruz — Full Stack Developer",
  description: "Full Stack Developer with 8+ years of experience in Python, PHP, and database-driven enterprise systems.",
  keywords: ["Full Stack Developer", "PHP", "Python", "Laravel", "MySQL", "PostgreSQL", "Jude Dela Cruz"],
  openGraph: {
    title: "Jude Dela Cruz — Full Stack Developer",
    description: "Full Stack Developer with 8+ years of experience delivering enterprise-level web and desktop applications.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
