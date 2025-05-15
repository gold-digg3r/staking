import Link from "next/link"
import { Github, Twitter, DiscIcon as Discord } from "lucide-react"

import Logo from "@/components/logo"
import { APP_META } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">{APP_META.DESCRIPTION}</p>
            <div className="flex space-x-4">
              <Link
                href={APP_META.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold-600"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href={APP_META.DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold-600"
              >
                <Discord className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Link>
              <Link
                href="https://github.com/golddigger"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold-600"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/staking" className="text-sm text-muted-foreground hover:text-gold-600">
                  Staking
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-muted-foreground hover:text-gold-600">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-gold-600">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/staking/calculators" className="text-sm text-muted-foreground hover:text-gold-600">
                  Calculators
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-gold-600">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-gold-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-gold-600">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/terms-of-use" className="text-sm text-muted-foreground hover:text-gold-600">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-gold-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies-policy" className="text-sm text-muted-foreground hover:text-gold-600">
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Gold Digger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
