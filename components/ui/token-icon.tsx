import Image from "next/image"
import { cn } from "@/lib/utils"

interface TokenIconProps {
  symbol: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function TokenIcon({ symbol, size = "md", className }: TokenIconProps) {
  const sizes = {
    sm: 20,
    md: 24,
    lg: 32,
  }

  const iconSize = sizes[size]

  // Map token symbols to their image paths and types
  const tokenImages: Record<string, { path: string; type: "png" | "svg" }> = {
    DIGR: { path: "/digr.png", type: "png" },
    GOLD: { path: "/gold-token-icon.png", type: "png" },
    SOL: { path: "/sol.png", type: "png" },
    ICON: { path: "/icon.svg", type: "svg" },
    // Add more tokens as needed
  }

  const tokenInfo = tokenImages[symbol] || { path: "/placeholder.svg", type: "png" }

  return (
    <div className={cn("relative", className)} style={{ width: iconSize, height: iconSize }}>
      <Image
        src={tokenInfo.path || "/placeholder.svg"}
        alt={`${symbol} token`}
        width={iconSize}
        height={iconSize}
        className="object-contain"
      />
    </div>
  )
}
