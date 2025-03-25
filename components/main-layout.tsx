"use client"

import { useState, useEffect } from "react"
import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  Headphones,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  Tag,
  Ticket,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { NotificationsPopover } from "@/components/notifications/notifications-popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // This is to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/login")
  }

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar pathname={pathname} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="mr-2" />
            <div className="w-full flex-1">
              <form className="hidden sm:block">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <NotificationsPopover />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full overflow-hidden">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>John Smith</span>
                      <span className="text-xs text-muted-foreground">john.smith@example.com</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

interface AppSidebarProps {
  pathname: string
}

function AppSidebar({ pathname }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="flex h-16 items-center justify-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6 text-primary" />
        </Link>
      </SidebarHeader>
      <SidebarContent className="scrollbar-elegant">
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
                  <Link href="/dashboard">
                    <BarChart3 />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/customers"} tooltip="Customers">
                  <Link href="/customers">
                    <Users />
                    <span>Customers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/leads"} tooltip="Leads">
                  <Link href="/leads">
                    <Tag />
                    <span>Leads</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/calendar"} tooltip="Calendar">
                  <Link href="/calendar">
                    <Calendar />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/invoices"} tooltip="Invoices">
                  <Link href="/invoices">
                    <CreditCard />
                    <span>Invoices</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Communication</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/inbox"} tooltip="Inbox">
                  <Link href="/inbox">
                    <Inbox />
                    <span>Inbox</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-primary">12</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/chat"} tooltip="Chat">
                  <Link href="/chat">
                    <MessageSquare />
                    <span>Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/tickets"} tooltip="Tickets">
                  <Link href="/tickets">
                    <Ticket />
                    <span>Tickets</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-primary">5</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Marketing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/campaigns"} tooltip="Campaigns">
                  <Link href="/campaigns">
                    <Bell />
                    <span>Campaigns</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/broadcasts"} tooltip="Broadcasts">
                  <Link href="/broadcasts">
                    <Headphones />
                    <span>Broadcasts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" isActive={pathname === "/settings"}>
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

