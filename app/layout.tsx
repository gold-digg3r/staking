import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { SolanaWalletProvider } from "@/components/solana/wallet-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: "Gold Digger | Solana NFT Staking Platform",
    template: "%s | Gold Digger",
  },
  description: "Stake your NFTs and tokens to earn rewards in the Gold Digger ecosystem on Solana",
  keywords: ["Solana", "NFT", "Staking", "DeFi", "Gold Digger", "Crypto", "Web3", "Blockchain"],
  authors: [{ name: "Gold Digger Team" }],
  creator: "Gold Digger",
  publisher: "Gold Digger",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://golddigger.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Gold Digger | Solana NFT Staking Platform",
    description: "Stake your NFTs and tokens to earn rewards in the Gold Digger ecosystem on Solana",
    siteName: "Gold Digger",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gold Digger",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gold Digger | Solana NFT Staking Platform",
    description: "Stake your NFTs and tokens to earn rewards in the Gold Digger ecosystem on Solana",
    images: ["/twitter-image.png"],
    creator: "@golddigger",
  },
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SolanaWalletProvider>
            <AuthProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </AuthProvider>
          </SolanaWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
