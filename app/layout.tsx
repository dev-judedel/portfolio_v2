import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import TopBar from "@/components/TopBar";
import VisitorTracker from "@/components/VisitorTracker";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Jude Dela Cruz — Full Stack Developer",
  description: "Full Stack Developer with 8+ years experience in Python, PHP, and enterprise systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body>
        <div style={{ display: "flex", minHeight: "100vh" }}>

          {/* Desktop Sidebar */}
          <Sidebar />

          {/* Main area */}
          <div style={{
            flex: 1,
            marginLeft: "var(--sidebar-width)",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
            className="main-area"
          >
            <TopBar />
            <main style={{
              flex: 1,
              overflowY: "auto",
              paddingBottom: "var(--mobile-nav-height)",
            }}>
              {children}
            </main>
          </div>

        </div>

        {/* Mobile bottom nav */}
        <MobileNav />

        {/* Visitor tracking */}
        <VisitorTracker />

        {/* Chatbot */}
        <ChatBot />

        <style>{`
          @media (max-width: 768px) {
            .main-area { margin-left: 0 !important; }
            .desktop-sidebar { display: none !important; }
          }
          @media (min-width: 769px) {
            .mobile-nav { display: none !important; }
            main { padding-bottom: 0 !important; }
          }
        `}</style>
      </body>
    </html>
  );
}
