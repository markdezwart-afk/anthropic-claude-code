import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wanderlust Travel Agency | Discover Your Next Adventure",
  description: "Experience the world with Wanderlust Travel Agency. Personalized travel planning, AI concierge service, and curated destinations for unforgettable journeys.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-off-white text-cod-gray antialiased">
        {children}
      </body>
    </html>
  );
}
