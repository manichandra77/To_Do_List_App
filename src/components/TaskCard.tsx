import { useState } from "react";
import { 
  MoreHorizontal, 
  Calendar, 
  Flag, 
  Edit, 
  Trash2,
  Clock,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { CompletionBox } from "@/components/CompletionBox";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  dueDate?: Date;
  category: string;
  createdAt: Date;
  image?: string; // Base64 or URL to task image
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  high: { label: "High", className: "priority-high", icon: Flag },
  medium: { label: "Medium", className: "priority-medium", icon: Flag },
  low: { label: "Low", className: "priority-low", icon: Flag }
};

export function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const priority = priorityConfig[task.priority];
  const PriorityIcon = priority.icon;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };

  const isOverdue = task.dueDate && task.dueDate < new Date() && !task.completed;

  return (
    <div
      className={cn(
        "card-gradient rounded-xl p-6 transition-all duration-300 animate-fade-in group",
        task.completed && "opacity-75 hover:opacity-90",
        isHovered && "scale-[1.01]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          {/* Enhanced Completion Box */}
          <CompletionBox
            completed={task.completed}
            onToggle={() => onToggleComplete(task.id)}
            className="mt-1"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-semibold text-foreground mb-2 transition-all duration-300",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={cn(
                "text-sm text-muted-foreground mb-3 leading-relaxed",
                task.completed && "line-through opacity-70"
              )}>
                {task.description}
              </p>
            )}

            {/* Task Image */}
            {task.image && !imageError && (
              <div className="mb-4">
                <img
                  src={task.image}
                  alt="Task attachment"
                  className="task-image w-full max-w-xs h-32 object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
            )}

            {/* Meta information */}
            <div className="flex items-center flex-wrap gap-3 text-xs">
              {/* Priority */}
              <Badge variant="outline" className={cn("px-3 py-1.5 font-medium", priority.className)}>
                <PriorityIcon className="w-3 h-3 mr-1.5" />
                {priority.label}
              </Badge>

              {/* Due date */}
              {task.dueDate && (
                <div className={cn(
                  "flex items-center space-x-1.5 px-3 py-1.5 rounded-full border",
                  isOverdue 
                    ? "text-destructive border-destructive/30 bg-destructive-light" 
                    : "text-muted-foreground border-border bg-muted/30"
                )}>
                  <Calendar className="w-3 h-3" />
                  <span className="font-medium">{formatDate(task.dueDate)}</span>
                  {isOverdue && (
                    <span className="text-destructive font-bold text-[10px]">OVERDUE</span>
                  )}
                </div>
              )}

              {/* Time ago */}
              <div className="flex items-center space-x-1.5 text-muted-foreground px-2 py-1">
                <Clock className="w-3 h-3" />
                <span className="text-[11px]">
                  {Math.floor((Date.now() - task.createdAt.getTime()) / (1000 * 60 * 60 * 24))}d ago
                </span>
              </div>

              {/* Image indicator */}
              {task.image && !imageError && (
                <div className="flex items-center space-x-1 text-primary">
                  <ImageIcon className="w-3 h-3" />
                  <span className="text-[11px] font-medium">Attachment</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className={cn(
          "opacity-0 transition-all duration-300 transform translate-x-2",
          (isHovered || task.completed) && "opacity-100 translate-x-0"
        )}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 hover:bg-muted/80 transition-all duration-200 hover:scale-110"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-morphism">
              <DropdownMenuItem 
                onClick={() => onEdit(task.id)}
                className="transition-all duration-200 hover:bg-primary/10"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(task.id)}
                className="text-destructive hover:bg-destructive/10 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}