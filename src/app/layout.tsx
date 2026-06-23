import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "PCJ PC — PC Components Store",
  description: "Build your dream rig with premium PC components.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before hydration — sets saved theme, prevents flash */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('pcforge_theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`
        }} />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <footer className="site-footer">
          &copy; 2025 PCJ PC — All rights reserved
        </footer>
      </body>
    </html>
  );
}
