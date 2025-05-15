"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Coins, History, Trophy, ChevronDown, Calculator, BarChart3 } from "lucide-react"
import { NotificationCenter } from "@/components/notifications/notification-center"

const navItems = [
  {
    title: "Dashboard",
    href: "/staking/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Staking Pools",
    href: "/staking/pools",
    icon: <Coins className="h-5 w-5" />,
  },
  {
    title: "My Stakes",
    href: "/staking/my-stakes",
    icon: <Coins className="h-5 w-5" />,
  },
  {
    title: "History",
    href: "/staking/history",
    icon: <History className="h-5 w-5" />,
  },
  {
    title: "Features",
    href: "/staking/features",
    icon: <Calculator className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/staking/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: <Trophy className="h-5 w-5" />,
  },
]

export function StakingNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        {/* Mobile Navigation */}
        <div className="md:hidden w-full">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between mb-6 border-gold-300/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>Staking Navigation</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
          </Button>

          {isOpen && (
            <div className="bg-background border border-gold-300/20 rounded-md shadow-lg mb-6">
              <nav className="p-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                      pathname === item.href
                        ? "bg-gold-300/10 text-gold-300"
                        : "hover:bg-gold-300/5 hover:text-gold-300",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-1 border-b border-gold-300/10 pb-1 w-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href ? "bg-gold-300/10 text-gold-300" : "hover:bg-gold-300/5 hover:text-gold-300",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>

        {/* Notifications */}
        <div className="absolute right-4 top-4 md:static md:ml-4">
          <NotificationCenter />
        </div>
      </div>
    </>
  )
}
