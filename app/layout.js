import "./globals.css";
import { DM_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "react-day-picker/style.css";
import ThemeLayout from "./themeLayout";

const DMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "My Discipline",
  description: "Simple tool to help you stay on track with your goals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${DMSans.className}`}>
        <ThemeLayout></ThemeLayout>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
