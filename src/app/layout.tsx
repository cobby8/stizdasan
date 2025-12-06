import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "스티즈 농구교실 다산점 | STIZ BASKETBALL",
  description: "다산 최고의 농구교실, 스티즈 농구교실 다산점입니다.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
