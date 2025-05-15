"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bell, X, Check, Clock, Coins, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    title: "Rewards Available",
    message: "You have 25.5 DIGR rewards available to claim from your staked NFTs.",
    type: "reward",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: "2",
    title: "Staking Complete",
    message: "Your Gold Digger #1234 has been successfully staked.",
    type: "success",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "3",
    title: "Cooldown Period Ended",
    message: "The cooldown period for your Jailbird #5678 has ended. You can now unstake it.",
    type: "info",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "4",
    title: "New Staking Pool",
    message: "A new Syndicate staking pool is now available with 18% APR.",
    type: "info",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: "5",
    title: "Unstaking Failed",
    message: "Your unstaking transaction for Gold Digger #4321 failed. Please try again.",
    type: "error",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  },
]

interface Notification {
  id: string
  title: string
  message: string
  type: "reward" | "success" | "info" | "error"
  read: boolean
  date: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch notifications from an API
    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds} seconds ago`

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`

    const days = Math.floor(hours / 24)
    return `${days} day${days !== 1 ? "s" : ""} ago`
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "reward":
        return <Coins className="h-5 w-5 text-gold-500" />
      case "success":
        return <Check className="h-5 w-5 text-green-500" />
      case "info":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-xs text-black">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
              Mark all as read
            </Button>
          )}
        </div>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="gold" className="ml-1 px-1 py-0">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="p-0">
            <NotificationList
              notifications={notifications}
              markAsRead={markAsRead}
              getTimeAgo={getTimeAgo}
              getNotificationIcon={getNotificationIcon}
            />
          </TabsContent>
          <TabsContent value="unread" className="p-0">
            <NotificationList
              notifications={notifications.filter((n) => !n.read)}
              markAsRead={markAsRead}
              getTimeAgo={getTimeAgo}
              getNotificationIcon={getNotificationIcon}
            />
          </TabsContent>
          <TabsContent value="rewards" className="p-0">
            <NotificationList
              notifications={notifications.filter((n) => n.type === "reward")}
              markAsRead={markAsRead}
              getTimeAgo={getTimeAgo}
              getNotificationIcon={getNotificationIcon}
            />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

interface NotificationListProps {
  notifications: Notification[]
  markAsRead: (id: string) => void
  getTimeAgo: (date: string) => string
  getNotificationIcon: (type: Notification["type"]) => React.ReactNode
}

function NotificationList({ notifications, markAsRead, getTimeAgo, getNotificationIcon }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <Bell className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No notifications to display</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="divide-y">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn("flex gap-3 p-4 hover:bg-muted/50 transition-colors", !notification.read && "bg-gold-500/5")}
          >
            <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-none">{notification.title}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground"
                  onClick={() => markAsRead(notification.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground">{getTimeAgo(notification.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
