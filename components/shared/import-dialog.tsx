"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText } from "lucide-react"
import { fileUtils } from "@/lib/data-service"

interface ImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (data: string, format: "csv" | "json") => Promise<boolean>
  entityName: string
}

export function ImportDialog({ open, onOpenChange, onImport, entityName }: ImportDialogProps) {
  const [activeTab, setActiveTab] = useState<"file" | "paste">("file")
  const [format, setFormat] = useState<"csv" | "json">("csv")
  const [pastedData, setPastedData] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("")
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      try {
        // Determine format from file extension
        const fileFormat = file.name.endsWith(".json") ? "json" : "csv"
        setFormat(fileFormat)

        // Read file content
        const content = await fileUtils.readFile(file)
        setPastedData(content)
      } catch (err) {
        setError("Failed to read file")
      }
    }
  }

  const handleSubmit = async () => {
    setError("")
    if (!pastedData.trim()) {
      setError("No data provided")
      return
    }

    setIsSubmitting(true)
    try {
      const success = await onImport(pastedData, format)
      if (success) {
        onOpenChange(false)
        setPastedData("")
      } else {
        setError(`Failed to import ${entityName}`)
      }
    } catch (err) {
      setError(`Error importing ${entityName}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import {entityName}</DialogTitle>
          <DialogDescription>
            Import {entityName} from a CSV or JSON file, or paste the data directly.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="file" value={activeTab} onValueChange={(value) => setActiveTab(value as "file" | "paste")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="paste">Paste Data</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-2">Upload a file</h3>
              <p className="text-sm text-muted-foreground mb-4">Drag and drop a CSV or JSON file, or click to browse</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.json"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="mb-2">
                <FileText className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
              <p className="text-xs text-muted-foreground">Supported formats: CSV, JSON</p>
            </div>

            {pastedData && (
              <div className="border rounded-lg p-3 bg-muted/50">
                <p className="text-sm font-medium">File loaded: {format.toUpperCase()}</p>
                <p className="text-xs text-muted-foreground">
                  {pastedData.length} characters, approximately {pastedData.split("\n").length} rows
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="paste" className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="format" className="text-right">
                  Format
                </Label>
                <div className="col-span-3 flex gap-4">
                  <Label className="flex items-center gap-2">
                    <input type="radio" name="format" checked={format === "csv"} onChange={() => setFormat("csv")} />
                    CSV
                  </Label>
                  <Label className="flex items-center gap-2">
                    <input type="radio" name="format" checked={format === "json"} onChange={() => setFormat("json")} />
                    JSON
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="data" className="text-right pt-2">
                  Data
                </Label>
                <Textarea
                  id="data"
                  value={pastedData}
                  onChange={(e) => setPastedData(e.target.value)}
                  placeholder={
                    format === "csv" ? "id,name,email,..." : '[\n  {\n    "id": "...",\n    "name": "..."\n  }\n]'
                  }
                  className="col-span-3 font-mono text-sm"
                  rows={10}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {error && <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm">{error}</div>}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !pastedData.trim()}>
            {isSubmitting ? "Importing..." : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

