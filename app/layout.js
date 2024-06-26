import { Header } from "@/components/Gloabals/Header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "fuseON",
  description: "fuseON "
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <Header/>
          {children}
      </body>
    </html>
  );
}