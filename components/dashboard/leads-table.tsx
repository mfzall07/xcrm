"use client"

import { MoreHorizontal, User } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { leads } from "@/lib/data"

export function LeadsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Value</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell className="font-medium">{lead.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{lead.name}</span>
                  <span className="text-xs text-muted-foreground">{lead.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{lead.company}</TableCell>
            <TableCell>
              <Badge
                variant={
                  lead.status === "New"
                    ? "default"
                    : lead.status === "Contacted"
                      ? "secondary"
                      : lead.status === "Qualified"
                        ? "outline"
                        : "destructive"
                }
              >
                {lead.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{lead.value}</TableCell>
            <TableCell>{lead.date}</TableCell>
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
                  <DropdownMenuItem>Edit lead</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Convert to customer</DropdownMenuItem>
                  <DropdownMenuItem>Mark as lost</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

