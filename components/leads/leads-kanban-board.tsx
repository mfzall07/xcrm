"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Plus, MoreHorizontal, AlertCircle, Clock, CheckCircle, Trash2, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewLeadDialog } from "@/components/leads/new-lead-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { toast } from "@/components/ui/use-toast"
import type { KanbanLead } from "@/lib/data"
import { fileUtils } from "@/lib/data-service"

// Define the column types
const columns = {
  new: {
    id: "new",
    title: "New Leads",
    icon: <AlertCircle className="h-4 w-4 text-blue-500" />,
    color: "bg-blue-500",
  },
  contacted: {
    id: "contacted",
    title: "Contacted",
    icon: <Clock className="h-4 w-4 text-yellow-500" />,
    color: "bg-yellow-500",
  },
  qualified: {
    id: "qualified",
    title: "Qualified",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    color: "bg-green-500",
  },
  proposal: {
    id: "proposal",
    title: "Proposal",
    icon: <CheckCircle className="h-4 w-4 text-purple-500" />,
    color: "bg-purple-500",
  },
  negotiation: {
    id: "negotiation",
    title: "Negotiation",
    icon: <CheckCircle className="h-4 w-4 text-orange-500" />,
    color: "bg-orange-500",
  },
}

export function LeadsKanbanBoard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentLead, setCurrentLead] = useState<KanbanLead | null>(null)
  const [currentColumn, setCurrentColumn] = useState<string>("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [leadToDelete, setLeadToDelete] = useState<{ id: string; column: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [kanbanData, setKanbanData] = useState<Record<string, KanbanLead[]>>({
    new: [],
    contacted: [],
    qualified: [],
    proposal: [],
    negotiation: [],
  })

  // Load kanban data
  useEffect(() => {
    loadKanbanData()
  }, [])

  const loadKanbanData = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      const data = await Promise.resolve({ ...kanbanData })
      setKanbanData(data)
    } catch (error) {
      console.error("Failed to load kanban data:", error)
      toast({
        title: "Error",
        description: "Failed to load leads. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle drag end
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item is dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Find the lead that was dragged
    const lead = kanbanData[source.droppableId].find((item) => item.id === draggableId)
    if (!lead) return

    // Create a copy of the source column
    const sourceColumn = [...kanbanData[source.droppableId]]
    // Remove the lead from the source column
    sourceColumn.splice(source.index, 1)

    // Create a copy of the destination column
    const destinationColumn = [...kanbanData[destination.droppableId]]
    // Add the lead to the destination column
    destinationColumn.splice(destination.index, 0, lead)

    // Update the state
    setKanbanData({
      ...kanbanData,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destinationColumn,
    })

    // In a real app, you would update the lead status in the database
    toast({
      title: "Lead Moved",
      description: `Lead moved to ${columns[destination.droppableId as keyof typeof columns].title}`,
    })
  }

  // Handle lead creation/update
  const handleSaveLead = (leadData: any) => {
    try {
      if (isEditMode && currentLead && currentColumn) {
        // Update existing lead
        const updatedLead = {
          ...currentLead,
          ...leadData,
          tags: leadData.tags.split(",").map((tag: string) => tag.trim()),
        }

        const columnLeads = [...kanbanData[currentColumn]]
        const leadIndex = columnLeads.findIndex((lead) => lead.id === currentLead.id)

        if (leadIndex !== -1) {
          columnLeads[leadIndex] = updatedLead
          setKanbanData({
            ...kanbanData,
            [currentColumn]: columnLeads,
          })
        }

        toast({
          title: "Success",
          description: "Lead updated successfully",
        })
      } else {
        // Create new lead
        const newLead: KanbanLead = {
          id: `lead-${Date.now()}`,
          title: leadData.title,
          company: leadData.company,
          contact: leadData.contact,
          value: leadData.value,
          dueDate: leadData.dueDate,
          tags: leadData.tags.split(",").map((tag: string) => tag.trim()),
          priority: leadData.priority,
        }

        // Add to the "new" column by default
        setKanbanData({
          ...kanbanData,
          new: [...kanbanData.new, newLead],
        })

        toast({
          title: "Success",
          description: "Lead added successfully",
        })
      }

      // Reset state
      setIsDialogOpen(false)
      setIsEditMode(false)
      setCurrentLead(null)
      setCurrentColumn("")
    } catch (error) {
      console.error("Failed to save lead:", error)
      toast({
        title: "Error",
        description: "Failed to save lead. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle lead deletion
  const handleDeleteLead = () => {
    if (!leadToDelete) return

    try {
      const { id, column } = leadToDelete
      const updatedLeads = kanbanData[column].filter((lead) => lead.id !== id)

      setKanbanData({
        ...kanbanData,
        [column]: updatedLeads,
      })

      toast({
        title: "Success",
        description: "Lead deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete lead:", error)
      toast({
        title: "Error",
        description: "Failed to delete lead. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setLeadToDelete(null)
    }
  }

  // Handle edit lead
  const handleEditLead = (lead: KanbanLead, column: string) => {
    setCurrentLead(lead)
    setCurrentColumn(column)
    setIsEditMode(true)
    setIsDialogOpen(true)
  }

  // Export kanban data
  const handleExport = (format: "csv" | "json") => {
    try {
      let data
      if (format === "json") {
        data = JSON.stringify(kanbanData, null, 2)
      } else {
        // CSV format - flatten the data
        const flattenedLeads = Object.entries(kanbanData).flatMap(([column, leads]) =>
          leads.map((lead) => ({
            ...lead,
            status: column,
            tags: lead.tags.join(", "),
          })),
        )

        if (flattenedLeads.length === 0) {
          throw new Error("No leads to export")
        }

        const headers = Object.keys(flattenedLeads[0]).join(",")
        const rows = flattenedLeads.map((lead) =>
          Object.values(lead)
            .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
            .join(","),
        )
        data = [headers, ...rows].join("\n")
      }

      const contentType = format === "csv" ? "text/csv" : "application/json"
      const fileName = `leads.${format}`

      fileUtils.downloadFile(data, fileName, contentType)

      toast({
        title: "Success",
        description: `Leads exported as ${format.toUpperCase()} successfully`,
      })
    } catch (error) {
      console.error("Failed to export leads:", error)
      toast({
        title: "Error",
        description: "Failed to export leads. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lead Pipeline</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("json")}>Export as JSON</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            onClick={() => {
              setIsEditMode(false)
              setCurrentLead(null)
              setCurrentColumn("")
              setIsDialogOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(columns).map(([columnId, column]) => (
              <div key={columnId} className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  {column.icon}
                  <h3 className="font-medium">{column.title}</h3>
                  <Badge variant="outline" className="ml-auto">
                    {kanbanData[columnId]?.length || 0}
                  </Badge>
                </div>
                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex-1 bg-muted/30 rounded-lg p-2 min-h-[500px]"
                    >
                      {kanbanData[columnId]?.map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2 shadow-sm"
                            >
                              <CardHeader className="p-3 pb-0">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-sm font-medium">{lead.title}</CardTitle>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem onClick={() => handleEditLead(lead, columnId)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => {
                                          setLeadToDelete({ id: lead.id, column: columnId })
                                          setIsDeleteDialogOpen(true)
                                        }}
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                <CardDescription className="text-xs mt-1">
                                  {lead.company} • {lead.contact}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="p-3 pt-2">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="text-sm font-medium">{lead.value}</div>
                                  <Badge
                                    variant={
                                      lead.priority === "High"
                                        ? "destructive"
                                        : lead.priority === "Medium"
                                          ? "default"
                                          : "secondary"
                                    }
                                  >
                                    {lead.priority}
                                  </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">Due: {lead.dueDate}</div>
                              </CardContent>
                              <CardFooter className="p-3 pt-0 flex flex-wrap gap-1">
                                {lead.tags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </CardFooter>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {kanbanData[columnId]?.length === 0 && (
                        <div className="flex items-center justify-center h-20 border border-dashed rounded-md">
                          <p className="text-sm text-muted-foreground">No leads</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}

      {/* New/Edit Lead Dialog */}
      <NewLeadDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        lead={currentLead}
        isEditMode={isEditMode}
        onSave={handleSaveLead}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the lead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLead} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

