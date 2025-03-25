"use client"

import { useState } from "react"
import { CheckCircle2, Clock, Edit, MoreHorizontal, Trash, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { tasks } from "@/lib/data"

export function UpcomingTasks() {
  const [taskList, setTaskList] = useState(tasks)

  const toggleTaskCompletion = (taskId: number) => {
    setTaskList(taskList.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (taskId: number) => {
    setTaskList(taskList.filter((task) => task.id !== taskId))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      {taskList.map((task) => (
        <div
          key={task.id}
          className={`flex items-start justify-between rounded-md border p-3 ${
            task.completed ? "bg-muted/50 text-muted-foreground" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTaskCompletion(task.id)}
              className="h-5 w-5"
            />
            <div>
              <p className={`text-sm font-medium ${task.completed ? "line-through" : ""}`}>{task.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {task.dueTime}
                </div>
                <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleTaskCompletion(task.id)}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark as {task.completed ? "incomplete" : "complete"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}

      <Button variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add New Task
      </Button>
    </div>
  )
}

