"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  MessageSquare,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Download,
  Trash2,
  Edit,
  Upload,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NewTicketDialog } from "@/components/tickets/new-ticket-dialog"
import type { Ticket } from "@/lib/data"
import { ticketService, fileUtils } from "@/lib/data-service"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ImportDialog } from "@/components/shared/import-dialog"

export function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null)
  const [ticketToDelete, setTicketToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    setIsLoading(true)
    try {
      const data = await ticketService.getAll()
      setTickets(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tickets",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTicket = async (ticket: Omit<Ticket, "id">) => {
    try {
      const newTicket = await ticketService.create(ticket)
      setTickets([...tickets, newTicket])
      toast({
        title: "Success",
        description: "Ticket created successfully",
      })
      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create ticket",
        variant: "destructive",
      })
      return false
    }
  }

  const handleUpdateTicket = async (id: string, ticket: Partial<Ticket>) => {
    try {
      const updatedTicket = await ticketService.update(id, ticket)
      if (updatedTicket) {
        setTickets(tickets.map((t) => (t.id === id ? updatedTicket : t)))
        toast({
          title: "Success",
          description: "Ticket updated successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update ticket",
        variant: "destructive",
      })
      return false
    }
  }

  const handleDeleteTicket = async (id: string) => {
    try {
      const success = await ticketService.delete(id)
      if (success) {
        setTickets(tickets.filter((t) => t.id !== id))
        toast({
          title: "Success",
          description: "Ticket deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete ticket",
        variant: "destructive",
      })
    }
  }

  const handleExport = (format: "csv" | "json") => {
    try {
      const data = ticketService.export(format)
      const contentType = format === "csv" ? "text/csv" : "application/json"
      const fileName = `tickets.${format}`
      fileUtils.downloadFile(data, fileName, contentType)

      toast({
        title: "Success",
        description: `Tickets exported as ${format.toUpperCase()}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export tickets",
        variant: "destructive",
      })
    }
  }

  const handleImport = async (data: string, format: "csv" | "json") => {
    try {
      const success = await ticketService.import(data, format)
      if (success) {
        loadTickets()
        toast({
          title: "Success",
          description: "Tickets imported successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import tickets",
        variant: "destructive",
      })
      return false
    }
  }

  const handleReset = async () => {
    try {
      const success = await ticketService.reset()
      if (success) {
        loadTickets()
        toast({
          title: "Success",
          description: "Tickets reset to initial data",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset tickets",
        variant: "destructive",
      })
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "open" && ticket.status === "Open") ||
      (activeTab === "in-progress" && ticket.status === "In Progress") ||
      (activeTab === "pending" && ticket.status === "Pending") ||
      (activeTab === "resolved" && ticket.status === "Resolved")

    return matchesSearch && matchesTab
  })

  const openTickets = tickets.filter((ticket) => ticket.status === "Open").length
  const inProgressTickets = tickets.filter((ticket) => ticket.status === "In Progress").length
  const pendingTickets = tickets.filter((ticket) => ticket.status === "Pending").length
  const resolvedTickets = tickets.filter((ticket) => ticket.status === "Resolved").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge variant="default">Open</Badge>
      case "In Progress":
        return <Badge variant="secondary">In Progress</Badge>
      case "Pending":
        return <Badge variant="outline">Pending</Badge>
      case "Resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            <AlertCircle className="mr-1 h-3 w-3" />
            Critical
          </Badge>
        )
      case "High":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
            <AlertTriangle className="mr-1 h-3 w-3" />
            High
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Medium
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Support Tickets</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Tickets</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
            <p className="text-xs text-muted-foreground">+2 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets}</div>
            <p className="text-xs text-muted-foreground">+1 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTickets}</div>
            <p className="text-xs text-muted-foreground">No change</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedTickets}</div>
            <p className="text-xs text-muted-foreground">+3 since yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ticket Management</CardTitle>
          <CardDescription>View and manage customer support tickets.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("json")}>Export as JSON</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" onClick={() => setIsImportDialogOpen(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsResetDialogOpen(true)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setCurrentTicket(null)
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Ticket
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading tickets...
                    </TableCell>
                  </TableRow>
                ) : filteredTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No tickets found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ticket.customer.avatar} alt={ticket.customer.name} />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span>{ticket.customer.name}</span>
                            <span className="text-xs text-muted-foreground">{ticket.customer.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ticket.assignedTo.avatar} alt={ticket.assignedTo.name} />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <span>{ticket.assignedTo.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{new Date(ticket.lastUpdated).toLocaleDateString()}</span>
                          <span className="text-xs text-muted-foreground">{ticket.responseTime} ago</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentTicket(ticket)
                                setIsDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit ticket
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Assign ticket</DropdownMenuItem>
                            <DropdownMenuItem>Change status</DropdownMenuItem>
                            <DropdownMenuItem>Change priority</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Reply
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setTicketToDelete(ticket.id)
                                setIsDeleteDialogOpen(true)
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete ticket
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <NewTicketDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        ticket={currentTicket}
        onSave={(ticket) => {
          if (currentTicket) {
            return handleUpdateTicket(currentTicket.id, ticket)
          } else {
            return handleCreateTicket(ticket as Omit<Ticket, "id">)
          }
        }}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onImport={handleImport}
        entityName="tickets"
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the ticket.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (ticketToDelete) {
                  handleDeleteTicket(ticketToDelete)
                }
              }}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Ticket Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all ticket data to the initial demo data. Any changes you've made will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>Reset Data</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

