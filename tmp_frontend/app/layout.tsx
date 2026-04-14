import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import { cookies } from "next/headers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "PNB Hackathon Auth",
  description: "Premium Authentication system built for standard hackathon compliance.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("auth_token");

  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col items-center transition-colors duration-500 overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header isLoggedIn={isLoggedIn} />
          <main className="flex-1 w-full max-w-7xl mx-auto p-4 flex flex-col mt-[5vh] items-center mb-8 z-10 relative">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
