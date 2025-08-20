import { useState } from "react";
import { 
  Plus, 
  CheckSquare, 
  Calendar, 
  Archive, 
  Settings,
  Search,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface TaskSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewTask: () => void;
}

const categories = [
  { id: "all", label: "All Tasks", icon: CheckSquare, count: 12 },
  { id: "today", label: "Today", icon: Calendar, count: 5 },
  { id: "upcoming", label: "Upcoming", icon: Calendar, count: 4 },
  { id: "completed", label: "Completed", icon: Archive, count: 3 }
];

export function TaskSidebar({ 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange,
  onNewTask 
}: TaskSidebarProps) {
  return (
    <aside className="w-80 h-screen glass-morphism border-r border-border flex flex-col custom-scrollbar overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            TaskFlow Pro
          </h1>
          <ThemeToggle />
        </div>
        
        <Button 
          onClick={onNewTask}
          className="w-full btn-gradient text-primary-foreground hover:opacity-90 font-medium"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Search */}
      <div className="p-6 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 glass-morphism border-border/30 focus:border-primary/50 transition-smooth"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 text-left group",
                  isActive 
                    ? "bg-gradient-primary text-primary-foreground shadow-button scale-[1.02]" 
                    : "text-muted-foreground hover:text-foreground hover:bg-card-secondary hover:scale-[1.01] hover:shadow-card"
                )}
              >
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-3 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-medium">{category.label}</span>
                </div>
                <span className={cn(
                  "text-xs px-3 py-1 rounded-full font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary-foreground/20 text-primary-foreground" 
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border/50">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-card-secondary transition-smooth group"
        >
          <Settings className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-90" />
          Settings
        </Button>
      </div>
    </aside>
  );
}