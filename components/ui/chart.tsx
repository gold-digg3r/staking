"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | undefined>(undefined)

function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a ChartProvider")
  }
  return context
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    // Create CSS variables for each color in the config
    const style = React.useMemo(() => {
      return Object.entries(config).reduce<React.CSSProperties>((acc, [key, value]) => {
        acc[`--color-${key}`] = value.color
        return acc
      }, {})
    }, [config])

    return (
      <ChartContext.Provider value={{ config }}>
        <div ref={ref} className={cn("w-full", className)} style={style} {...props}>
          {children}
        </div>
      </ChartContext.Provider>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

interface ChartTooltipProps extends React.ComponentPropsWithoutRef<"div"> {}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("recharts-tooltip-wrapper", className)} {...props} />
})
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps extends React.ComponentPropsWithoutRef<"div"> {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    dataKey: string
  }>
  label?: string
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ active, payload, label, className, ...props }, ref) => {
    const { config } = useChartContext()

    if (!active || !payload?.length) {
      return null
    }

    return (
      <div ref={ref} className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props}>
        <div className="grid gap-0.5">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          {payload.map((item) => {
            const dataKey = item.dataKey as string
            const color = config[dataKey]?.color
            const label = config[dataKey]?.label || dataKey

            return (
              <div key={dataKey} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                  <p className="text-xs font-medium">{label}</p>
                </div>
                <p className="text-xs font-medium">{item.value}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
