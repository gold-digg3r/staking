"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"

interface StakingEvent {
  id: string
  type: "stake" | "unstake" | "reward"
  nftName?: string
  poolName: string
  amount?: number
  timestamp: string
  txHash: string
}

export function StakingHistory() {
  const [history, setHistory] = useState<StakingEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // In a real implementation, this would fetch from your API
        // For now, we'll use mock data
        const mockData: StakingEvent[] = [
          {
            id: "event1",
            type: "stake",
            nftName: "Jailbird #1234",
            poolName: "Jailbreak Pool",
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            txHash: "0x1234...5678",
          },
          {
            id: "event2",
            type: "stake",
            nftName: "Jailbird #5678",
            poolName: "Diamond Hands Pool",
            timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            txHash: "0x8765...4321",
          },
          {
            id: "event3",
            type: "reward",
            poolName: "Jailbreak Pool",
            amount: 50.25,
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            txHash: "0xabcd...efgh",
          },
          {
            id: "event4",
            type: "unstake",
            nftName: "Jailbird #1234",
            poolName: "Jailbreak Pool",
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            txHash: "0xijkl...mnop",
          },
        ]

        setTimeout(() => {
          setHistory(mockData)
          setTotalPages(2) // Mock pagination
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching staking history:", error)
        toast({
          title: "Error",
          description: "Failed to load staking history. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    setLoading(true)
    fetchHistory()
  }, [page, toast])

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "stake":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Stake
          </span>
        )
      case "unstake":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Unstake
          </span>
        )
      case "reward":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Reward
          </span>
        )
      default:
        return type
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No staking history yet</h3>
        <p className="text-muted-foreground mt-2">Your staking activity will appear here</p>
      </div>
    )
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Pool</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{getEventTypeLabel(event.type)}</TableCell>
                <TableCell>{event.type === "reward" ? `${event.amount} JAIL` : event.nftName}</TableCell>
                <TableCell>{event.poolName}</TableCell>
                <TableCell>{format(new Date(event.timestamp), "MMM d, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <a
                    href={`https://solscan.io/tx/${event.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {event.txHash.substring(0, 6)}...{event.txHash.substring(event.txHash.length - 4)}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Add default export while keeping the named export for backward compatibility
export default StakingHistory
