"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Filter, MoreHorizontal, Download, Upload, Trash2, Edit, RefreshCw } from "lucide-react"

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
import { CustomerDialog } from "@/components/customers/customer-dialog"
import type { Customer } from "@/lib/data"
import { customerService, fileUtils } from "@/lib/data-service"
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

export function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null)
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    setIsLoading(true)
    try {
      const data = await customerService.getAll()
      setCustomers(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCustomer = async (customer: Omit<Customer, "id">) => {
    try {
      const newCustomer = await customerService.create(customer)
      setCustomers([...customers, newCustomer])
      toast({
        title: "Success",
        description: "Customer created successfully",
      })
      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create customer",
        variant: "destructive",
      })
      return false
    }
  }

  const handleUpdateCustomer = async (id: string, customer: Partial<Customer>) => {
    try {
      const updatedCustomer = await customerService.update(id, customer)
      if (updatedCustomer) {
        setCustomers(customers.map((c) => (c.id === id ? updatedCustomer : c)))
        toast({
          title: "Success",
          description: "Customer updated successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update customer",
        variant: "destructive",
      })
      return false
    }
  }

  const handleDeleteCustomer = async (id: string) => {
    try {
      const success = await customerService.delete(id)
      if (success) {
        setCustomers(customers.filter((c) => c.id !== id))
        toast({
          title: "Success",
          description: "Customer deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      })
    }
  }

  const handleExport = (format: "csv" | "json") => {
    try {
      const data = customerService.export(format)
      const contentType = format === "csv" ? "text/csv" : "application/json"
      const fileName = `customers.${format}`
      fileUtils.downloadFile(data, fileName, contentType)

      toast({
        title: "Success",
        description: `Customers exported as ${format.toUpperCase()}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export customers",
        variant: "destructive",
      })
    }
  }

  const handleImport = async (data: string, format: "csv" | "json") => {
    try {
      const success = await customerService.import(data, format)
      if (success) {
        loadCustomers()
        toast({
          title: "Success",
          description: "Customers imported successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import customers",
        variant: "destructive",
      })
      return false
    }
  }

  const handleReset = async () => {
    try {
      const success = await customerService.reset()
      if (success) {
        loadCustomers()
        toast({
          title: "Success",
          description: "Customers reset to initial data",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset customers",
        variant: "destructive",
      })
    }
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeCustomers = customers.filter((customer) => customer.status === "Active").length
  const inactiveCustomers = customers.filter((customer) => customer.status === "Inactive").length
  const totalSpent = customers.reduce(
    (sum, customer) => sum + Number.parseFloat(customer.totalSpent.replace("$", "").replace(",", "")),
    0,
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsResetDialogOpen(true)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeCustomers} active, {inactiveCustomers} inactive
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {((activeCustomers / customers.length) * 100).toFixed(1)}% of total customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              $
              {(totalSpent / customers.length).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              per customer
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>View and manage your customers and their information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
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
              <Button
                size="sm"
                onClick={() => {
                  setCurrentCustomer(null)
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading customers...
                    </TableCell>
                  </TableRow>
                ) : filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.company}</TableCell>
                      <TableCell>
                        <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                      <TableCell className="text-right">{customer.totalSpent}</TableCell>
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
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentCustomer(customer)
                                setIsDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit customer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setCustomerToDelete(customer.id)
                                setIsDeleteDialogOpen(true)
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete customer
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

      <CustomerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        customer={currentCustomer}
        onSave={(customer) => {
          if (currentCustomer) {
            return handleUpdateCustomer(currentCustomer.id, customer)
          } else {
            return handleCreateCustomer(customer as Omit<Customer, "id">)
          }
        }}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onImport={handleImport}
        entityName="customers"
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the customer and remove their data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (customerToDelete) {
                  handleDeleteCustomer(customerToDelete)
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
            <AlertDialogTitle>Reset Customer Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all customer data to the initial demo data. Any changes you've made will be lost.
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

