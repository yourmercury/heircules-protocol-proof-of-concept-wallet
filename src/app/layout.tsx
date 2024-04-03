import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/header";
import RouterContextProvider from "@/context/route.context";
import { WagmiProvider_, wagmiConfig } from "@/engine/wagmiConfig";
import WalletContextProvider from "@/context/wallet.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Heircules Protocol",
  description: "Proof of work for wallet abstraction using smart contracts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider_>
          <WalletContextProvider>
            <RouterContextProvider>
              <NavBar />
              {children}
            </RouterContextProvider>
          </WalletContextProvider>
        </WagmiProvider_>
      </body>
    </html>
  );
}
