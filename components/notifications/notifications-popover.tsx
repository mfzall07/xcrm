"use client"

import { useState } from "react"
import { Bell, Check, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { notifications } from "@/lib/data"

// Fix the Link component in NotificationsPopover to use Next.js Link
import Link from "next/link"

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)
  const [notificationsList, setNotificationsList] = useState(notifications)

  const unreadCount = notificationsList.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotificationsList(notificationsList.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const dismissNotification = (id: number) => {
    setNotificationsList(notificationsList.filter((n) => n.id !== id))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="important">Important</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="p-0">
            <ScrollArea className="h-[300px]">
              {notificationsList.length > 0 ? (
                <div className="divide-y">
                  {notificationsList.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-3 p-3 hover:bg-muted/50 relative",
                        !notification.read && "bg-muted/30",
                      )}
                    >
                      <div className="flex-shrink-0">
                        {notification.type === "message" ? (
                          <Avatar>
                            <AvatarImage src={notification.avatar || ""} alt="" />
                            <AvatarFallback>{notification.initials}</AvatarFallback>
                          </Avatar>
                        ) : notification.type === "task" ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Clock className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <Bell className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <div className="flex gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => dismissNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Dismiss</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <Bell className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    You're all caught up! Check back later for new notifications.
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="unread" className="p-0">
            <ScrollArea className="h-[300px]">
              {notificationsList.filter((n) => !n.read).length > 0 ? (
                <div className="divide-y">
                  {notificationsList
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-3 p-3 hover:bg-muted/50 relative",
                          !notification.read && "bg-muted/30",
                        )}
                      >
                        <div className="flex-shrink-0">
                          {notification.type === "message" ? (
                            <Avatar>
                              <AvatarImage src={notification.avatar || ""} alt="" />
                              <AvatarFallback>{notification.initials}</AvatarFallback>
                            </Avatar>
                          ) : notification.type === "task" ? (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Clock className="h-5 w-5" />
                            </div>
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                              <Bell className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => dismissNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Dismiss</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <Bell className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No unread notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    You're all caught up! Check back later for new notifications.
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="important" className="p-0">
            <ScrollArea className="h-[300px]">
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <Bell className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No important notifications</h3>
                <p className="text-sm text-muted-foreground">
                  You don't have any important notifications at the moment.
                </p>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="border-t p-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/notifications">View all notifications</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// Remove the custom Link component since we're now importing it from next/link

