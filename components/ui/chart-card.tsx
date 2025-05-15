import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { LucideIcon } from "lucide-react"

interface ChartCardProps {
  title: string
  icon: LucideIcon
  badge?: string
  isLoading?: boolean
  className?: string
  children: React.ReactNode
}

export function ChartCard({ title, icon: Icon, badge, isLoading = false, className = "", children }: ChartCardProps) {
  return (
    <Card
      className={`border-neutral-200 dark:border-neutral-800 hover:border-gold-300/50 shadow-md hover:shadow-lg transition-shadow ${className}`}
    >
      <CardHeader className="bg-gradient-to-r from-gold-100/50 to-gold-50/30 dark:from-gold-900/10 dark:to-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <Icon className="mr-2 h-5 w-5 text-gold-500 dark:text-gold-300" />
            {title}
          </CardTitle>
          {badge && (
            <Badge variant="outline" className="border-gold-300/30 text-gold-700 dark:text-gold-300">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="animate-pulse">
            <Skeleton className="h-[300px] w-full" />
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">{children}</div>
        )}
      </CardContent>
    </Card>
  )
}
