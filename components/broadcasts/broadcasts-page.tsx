"use client"

import { useState, useEffect } from "react"
import {
  Headphones,
  Mail,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Calendar,
  Users,
  Send,
  Trash2,
  Edit,
  Upload,
  RefreshCw,
  Download,
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
import { Progress } from "@/components/ui/progress"
import { NewBroadcastDialog } from "@/components/broadcasts/new-broadcast-dialog"
import type { Broadcast } from "@/lib/data"
import { broadcastService, fileUtils } from "@/lib/data-service"
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

export function BroadcastsPage() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [currentBroadcast, setCurrentBroadcast] = useState<Broadcast | null>(null)
  const [broadcastToDelete, setBroadcastToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadBroadcasts()
  }, [])

  const loadBroadcasts = async () => {
    setIsLoading(true)
    try {
      const data = await broadcastService.getAll()
      setBroadcasts(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load broadcasts",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBroadcast = async (broadcast: Omit<Broadcast, "id">) => {
    try {
      const newBroadcast = await broadcastService.create(broadcast)
      setBroadcasts([...broadcasts, newBroadcast])
      toast({
        title: "Success",
        description: "Broadcast created successfully",
      })
      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create broadcast",
        variant: "destructive",
      })
      return false
    }
  }

  const handleUpdateBroadcast = async (id: string, broadcast: Partial<Broadcast>) => {
    try {
      const updatedBroadcast = await broadcastService.update(id, broadcast)
      if (updatedBroadcast) {
        setBroadcasts(broadcasts.map((b) => (b.id === id ? updatedBroadcast : b)))
        toast({
          title: "Success",
          description: "Broadcast updated successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update broadcast",
        variant: "destructive",
      })
      return false
    }
  }

  const handleDeleteBroadcast = async (id: string) => {
    try {
      const success = await broadcastService.delete(id)
      if (success) {
        setBroadcasts(broadcasts.filter((b) => b.id !== id))
        toast({
          title: "Success",
          description: "Broadcast deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete broadcast",
        variant: "destructive",
      })
    }
  }

  const handleExport = (format: "csv" | "json") => {
    try {
      const data = broadcastService.export(format)
      const contentType = format === "csv" ? "text/csv" : "application/json"
      const fileName = `broadcasts.${format}`
      fileUtils.downloadFile(data, fileName, contentType)

      toast({
        title: "Success",
        description: `Broadcasts exported as ${format.toUpperCase()}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export broadcasts",
        variant: "destructive",
      })
    }
  }

  const handleImport = async (data: string, format: "csv" | "json") => {
    try {
      const success = await broadcastService.import(data, format)
      if (success) {
        loadBroadcasts()
        toast({
          title: "Success",
          description: "Broadcasts imported successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import broadcasts",
        variant: "destructive",
      })
      return false
    }
  }

  const handleReset = async () => {
    try {
      const success = await broadcastService.reset()
      if (success) {
        loadBroadcasts()
        toast({
          title: "Success",
          description: "Broadcasts reset to initial data",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset broadcasts",
        variant: "destructive",
      })
    }
  }

  const filteredBroadcasts = broadcasts.filter((broadcast) => {
    const matchesSearch =
      broadcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broadcast.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broadcast.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "email" && broadcast.type === "Email") ||
      (activeTab === "whatsapp" && broadcast.type === "WhatsApp") ||
      (activeTab === "sms" && broadcast.type === "SMS") ||
      (activeTab === "push" && broadcast.type === "Push")

    return matchesSearch && matchesTab
  })

  const totalSent = broadcasts.filter((broadcast) => broadcast.status === "Sent").length
  const totalScheduled = broadcasts.filter((broadcast) => broadcast.status === "Scheduled").length
  const totalDrafts = broadcasts.filter((broadcast) => broadcast.status === "Draft").length

  const totalRecipients = broadcasts
    .filter((broadcast) => broadcast.status === "Sent")
    .reduce((sum, broadcast) => sum + broadcast.recipients, 0)

  const averageOpenRate =
    broadcasts
      .filter((broadcast) => broadcast.status === "Sent" && broadcast.openRate > 0)
      .reduce((sum, broadcast) => sum + broadcast.openRate, 0) /
      broadcasts.filter((broadcast) => broadcast.status === "Sent" && broadcast.openRate > 0).length || 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Broadcasting</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
              <TabsTrigger value="sms">SMS</TabsTrigger>
              <TabsTrigger value="push">Push</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Broadcasts</CardTitle>
            <Headphones className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{broadcasts.length}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                Sent: {totalSent}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Scheduled: {totalScheduled}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Drafts: {totalDrafts}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecipients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all sent campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Open Rate</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageOpenRate.toFixed(1)}%</div>
            <Progress value={averageOpenRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {broadcasts
                .filter((b) => b.status === "Scheduled")
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]?.date || "None"}
            </div>
            <p className="text-xs text-muted-foreground">
              {broadcasts
                .filter((b) => b.status === "Scheduled")
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]?.title ||
                "No scheduled broadcasts"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Broadcast Management</CardTitle>
          <CardDescription>Create and manage email, WhatsApp, SMS, and push notification campaigns.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search broadcasts..."
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
              <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Broadcast
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading broadcasts...
                    </TableCell>
                  </TableRow>
                ) : filteredBroadcasts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No broadcasts found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBroadcasts.map((broadcast) => (
                    <TableRow key={broadcast.id}>
                      <TableCell className="font-medium">{broadcast.id}</TableCell>
                      <TableCell>{broadcast.title}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            broadcast.type === "Email"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : broadcast.type === "WhatsApp"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : broadcast.type === "SMS"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                                  : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                          }
                        >
                          {broadcast.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            broadcast.status === "Sent"
                              ? "default"
                              : broadcast.status === "Scheduled"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {broadcast.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{broadcast.date || "-"}</TableCell>
                      <TableCell>{broadcast.recipients.toLocaleString()}</TableCell>
                      <TableCell>
                        {broadcast.status === "Sent" ? (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Open: {broadcast.openRate}%</span>
                              <span>Click: {broadcast.clickRate}%</span>
                            </div>
                            <Progress value={broadcast.openRate} className="h-1" />
                          </div>
                        ) : (
                          "-"
                        )}
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
                                setCurrentBroadcast(broadcast)
                                setIsDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit broadcast
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {broadcast.status === "Draft" && (
                              <DropdownMenuItem>
                                <Send className="mr-2 h-4 w-4" />
                                Send now
                              </DropdownMenuItem>
                            )}
                            {broadcast.status === "Draft" && (
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule
                              </DropdownMenuItem>
                            )}
                            {broadcast.status === "Scheduled" && (
                              <DropdownMenuItem>
                                <Send className="mr-2 h-4 w-4" />
                                Send now
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setBroadcastToDelete(broadcast.id)
                                setIsDeleteDialogOpen(true)
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete broadcast
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

      <NewBroadcastDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        broadcast={currentBroadcast}
        onSave={(broadcast) => {
          if (currentBroadcast) {
            return handleUpdateBroadcast(currentBroadcast.id, broadcast)
          } else {
            return handleCreateBroadcast(broadcast as Omit<Broadcast, "id">)
          }
        }}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onImport={handleImport}
        entityName="broadcasts"
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the broadcast.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (broadcastToDelete) {
                  handleDeleteBroadcast(broadcastToDelete)
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
            <AlertDialogTitle>Reset Broadcast Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all broadcast data to the initial demo data. Any changes you've made will be lost.
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

