"use client"

import { useState, useEffect } from "react"
import {
  BarChart3,
  Calendar,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Users,
  Mail,
  MessageSquare,
  Bell,
  Play,
  Pause,
  Copy,
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
import { Progress } from "@/components/ui/progress"
import { NewCampaignDialog } from "@/components/campaigns/new-campaign-dialog"
import type { Campaign } from "@/lib/data"
import { campaignService, fileUtils } from "@/lib/data-service"
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

export function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null)
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadCampaigns()
  }, [])

  const loadCampaigns = async () => {
    setIsLoading(true)
    try {
      const data = await campaignService.getAll()
      setCampaigns(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load campaigns",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCampaign = async (campaign: Omit<Campaign, "id">) => {
    try {
      const newCampaign = await campaignService.create(campaign)
      setCampaigns([...campaigns, newCampaign])
      toast({
        title: "Success",
        description: "Campaign created successfully",
      })
      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      })
      return false
    }
  }

  const handleUpdateCampaign = async (id: string, campaign: Partial<Campaign>) => {
    try {
      const updatedCampaign = await campaignService.update(id, campaign)
      if (updatedCampaign) {
        setCampaigns(campaigns.map((c) => (c.id === id ? updatedCampaign : c)))
        toast({
          title: "Success",
          description: "Campaign updated successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update campaign",
        variant: "destructive",
      })
      return false
    }
  }

  const handleDeleteCampaign = async (id: string) => {
    try {
      const success = await campaignService.delete(id)
      if (success) {
        setCampaigns(campaigns.filter((c) => c.id !== id))
        toast({
          title: "Success",
          description: "Campaign deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete campaign",
        variant: "destructive",
      })
    }
  }

  const handleExport = (format: "csv" | "json") => {
    try {
      const data = campaignService.export(format)
      const contentType = format === "csv" ? "text/csv" : "application/json"
      const fileName = `campaigns.${format}`
      fileUtils.downloadFile(data, fileName, contentType)

      toast({
        title: "Success",
        description: `Campaigns exported as ${format.toUpperCase()}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export campaigns",
        variant: "destructive",
      })
    }
  }

  const handleImport = async (data: string, format: "csv" | "json") => {
    try {
      const success = await campaignService.import(data, format)
      if (success) {
        loadCampaigns()
        toast({
          title: "Success",
          description: "Campaigns imported successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import campaigns",
        variant: "destructive",
      })
      return false
    }
  }

  const handleReset = async () => {
    try {
      const success = await campaignService.reset()
      if (success) {
        loadCampaigns()
        toast({
          title: "Success",
          description: "Campaigns reset to initial data",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset campaigns",
        variant: "destructive",
      })
    }
  }

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && campaign.status === "Active") ||
      (activeTab === "scheduled" && campaign.status === "Scheduled") ||
      (activeTab === "draft" && campaign.status === "Draft") ||
      (activeTab === "completed" && campaign.status === "Completed")

    return matchesSearch && matchesTab
  })

  const activeCampaigns = campaigns.filter((campaign) => campaign.status === "Active").length
  const scheduledCampaigns = campaigns.filter((campaign) => campaign.status === "Scheduled").length
  const draftCampaigns = campaigns.filter((campaign) => campaign.status === "Draft").length
  const completedCampaigns = campaigns.filter((campaign) => campaign.status === "Completed").length

  const totalReach = campaigns
    .filter((campaign) => campaign.status === "Active" || campaign.status === "Completed")
    .reduce((sum, campaign) => sum + campaign.reach, 0)

  const averageEngagement =
    campaigns
      .filter((campaign) => campaign.status === "Active" || campaign.status === "Completed")
      .reduce((sum, campaign) => sum + campaign.engagement, 0) /
      campaigns.filter((campaign) => campaign.status === "Active" || campaign.status === "Completed").length || 0

  const averageConversion =
    campaigns
      .filter((campaign) => campaign.status === "Active" || campaign.status === "Completed")
      .reduce((sum, campaign) => sum + campaign.conversion, 0) /
      campaigns.filter((campaign) => campaign.status === "Active" || campaign.status === "Completed").length || 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                Active: {activeCampaigns}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Scheduled: {scheduledCampaigns}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Draft: {draftCampaigns}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReach.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all active and completed campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement Rate</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageEngagement.toFixed(1)}%</div>
            <Progress value={averageEngagement} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Conversion Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageConversion.toFixed(1)}%</div>
            <Progress value={averageConversion} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
          <CardDescription>Create and manage marketing campaigns across multiple channels.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
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
                Create Campaign
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading campaigns...
                    </TableCell>
                  </TableRow>
                ) : filteredCampaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No campaigns found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.id}</TableCell>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            campaign.type === "Email"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : campaign.type === "SMS"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : campaign.type === "Push"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                                  : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                          }
                        >
                          {campaign.type === "Email" ? (
                            <Mail className="mr-1 h-3 w-3" />
                          ) : campaign.type === "SMS" ? (
                            <MessageSquare className="mr-1 h-3 w-3" />
                          ) : campaign.type === "Push" ? (
                            <Bell className="mr-1 h-3 w-3" />
                          ) : (
                            <BarChart3 className="mr-1 h-3 w-3" />
                          )}
                          {campaign.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            campaign.status === "Active"
                              ? "default"
                              : campaign.status === "Scheduled"
                                ? "secondary"
                                : campaign.status === "Completed"
                                  ? "outline"
                                  : "outline"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {campaign.startDate && campaign.endDate ? `${campaign.startDate} to ${campaign.endDate}` : "-"}
                      </TableCell>
                      <TableCell>{campaign.audience}</TableCell>
                      <TableCell>
                        {campaign.status === "Active" || campaign.status === "Completed" ? (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Reach: {campaign.reach.toLocaleString()}</span>
                              <span>Engagement: {campaign.engagement}%</span>
                            </div>
                            <Progress value={campaign.engagement} className="h-1" />
                            <div className="text-xs text-muted-foreground">Conversion: {campaign.conversion}%</div>
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
                                setCurrentCampaign(campaign)
                                setIsDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit campaign
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {campaign.status === "Draft" && (
                              <DropdownMenuItem>
                                <Play className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            {campaign.status === "Active" && (
                              <DropdownMenuItem>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause
                              </DropdownMenuItem>
                            )}
                            {campaign.status === "Scheduled" && (
                              <DropdownMenuItem>
                                <Play className="mr-2 h-4 w-4" />
                                Start now
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setCampaignToDelete(campaign.id)
                                setIsDeleteDialogOpen(true)
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete campaign
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

      <NewCampaignDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        campaign={currentCampaign}
        onSave={(campaign) => {
          if (currentCampaign) {
            return handleUpdateCampaign(currentCampaign.id, campaign)
          } else {
            return handleCreateCampaign(campaign as Omit<Campaign, "id">)
          }
        }}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onImport={handleImport}
        entityName="campaigns"
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the campaign.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (campaignToDelete) {
                  handleDeleteCampaign(campaignToDelete)
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
            <AlertDialogTitle>Reset Campaign Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all campaign data to the initial demo data. Any changes you've made will be lost.
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

