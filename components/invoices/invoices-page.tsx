"use client"

import { useState, useEffect } from "react"
import {
  CreditCard,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
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
import { NewInvoiceDialog } from "@/components/invoices/new-invoice-dialog"
import type { Invoice } from "@/lib/data"
import { invoiceService, fileUtils } from "@/lib/data-service"
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

export function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadInvoices()
  }, [])

  const loadInvoices = async () => {
    setIsLoading(true)
    try {
      const data = await invoiceService.getAll()
      setInvoices(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load invoices",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateInvoice = async (invoice: Omit<Invoice, "id">) => {
    try {
      const newInvoice = await invoiceService.create(invoice)
      setInvoices([...invoices, newInvoice])
      toast({
        title: "Success",
        description: "Invoice created successfully",
      })
      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive",
      })
      return false
    }
  }

  const handleUpdateInvoice = async (id: string, invoice: Partial<Invoice>) => {
    try {
      const updatedInvoice = await invoiceService.update(id, invoice)
      if (updatedInvoice) {
        setInvoices(invoices.map((i) => (i.id === id ? updatedInvoice : i)))
        toast({
          title: "Success",
          description: "Invoice updated successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update invoice",
        variant: "destructive",
      })
      return false
    }
  }

  const handleDeleteInvoice = async (id: string) => {
    try {
      const success = await invoiceService.delete(id)
      if (success) {
        setInvoices(invoices.filter((i) => i.id !== id))
        toast({
          title: "Success",
          description: "Invoice deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete invoice",
        variant: "destructive",
      })
    }
  }

  const handleExport = (format: "csv" | "json") => {
    try {
      const data = invoiceService.export(format)
      const contentType = format === "csv" ? "text/csv" : "application/json"
      const fileName = `invoices.${format}`
      fileUtils.downloadFile(data, fileName, contentType)

      toast({
        title: "Success",
        description: `Invoices exported as ${format.toUpperCase()}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export invoices",
        variant: "destructive",
      })
    }
  }

  const handleImport = async (data: string, format: "csv" | "json") => {
    try {
      const success = await invoiceService.import(data, format)
      if (success) {
        loadInvoices()
        toast({
          title: "Success",
          description: "Invoices imported successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import invoices",
        variant: "destructive",
      })
      return false
    }
  }

  const handleReset = async () => {
    try {
      const success = await invoiceService.reset()
      if (success) {
        loadInvoices()
        toast({
          title: "Success",
          description: "Invoices reset to initial data",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset invoices",
        variant: "destructive",
      })
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "paid" && invoice.status === "Paid") ||
      (activeTab === "pending" && invoice.status === "Pending") ||
      (activeTab === "overdue" && invoice.status === "Overdue")

    return matchesSearch && matchesTab
  })

  const totalPaid = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + Number.parseFloat(invoice.amount.replace("$", "").replace(",", "")), 0)

  const totalPending = invoices
    .filter((invoice) => invoice.status === "Pending")
    .reduce((sum, invoice) => sum + Number.parseFloat(invoice.amount.replace("$", "").replace(",", "")), 0)

  const totalOverdue = invoices
    .filter((invoice) => invoice.status === "Overdue")
    .reduce((sum, invoice) => sum + Number.parseFloat(invoice.amount.replace("$", "").replace(",", "")), 0)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Invoices & Billing</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="all" className="w-[400px]" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Invoices</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {(totalPaid + totalPending + totalOverdue).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">For current period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              $
              {totalPaid.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter((invoice) => invoice.status === "Paid").length} invoices paid
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              $
              {totalPending.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter((invoice) => invoice.status === "Pending").length} invoices pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              $
              {totalOverdue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter((invoice) => invoice.status === "Overdue").length} invoices overdue
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Management</CardTitle>
          <CardDescription>Manage your invoices, track payments, and send reminders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
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
                Create Invoice
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading invoices...
                    </TableCell>
                  </TableRow>
                ) : filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === "Paid"
                              ? "default"
                              : invoice.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{invoice.amount}</TableCell>
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
                            <DropdownMenuItem>View invoice</DropdownMenuItem>
                            <DropdownMenuItem>Edit invoice</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
                            <DropdownMenuItem>Send to customer</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Mark as paid</DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setInvoiceToDelete(invoice.id)
                                setIsDeleteDialogOpen(true)
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete invoice
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

      <NewInvoiceDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSave={handleCreateInvoice} />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onImport={handleImport}
        entityName="invoices"
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the invoice.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (invoiceToDelete) {
                  handleDeleteInvoice(invoiceToDelete)
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
            <AlertDialogTitle>Reset Invoice Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all invoice data to the initial demo data. Any changes you've made will be lost.
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

