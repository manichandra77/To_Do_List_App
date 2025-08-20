import { useState, useMemo } from "react";
import { TaskSidebar } from "@/components/TaskSidebar";
import { TaskCard, Task } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  SortAsc, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Calendar,
  TrendingUp
} from "lucide-react";

// Sample data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Review Q4 Marketing Strategy",
    description: "Analyze performance metrics and plan for next quarter",
    priority: "high",
    completed: false,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    category: "work",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: "2",
    title: "Prepare presentation slides",
    description: "Create compelling slides for the client meeting",
    priority: "high",
    completed: false,
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    category: "work",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: "3",
    title: "Update project documentation",
    description: "Document recent changes and API updates",
    priority: "medium",
    completed: false,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    category: "development",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: "4",
    title: "Team standup meeting",
    description: "Weekly team sync and progress review",
    priority: "medium",
    completed: true,
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    category: "meetings",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: "5",
    title: "Code review for feature branch",
    description: "Review the new authentication feature implementation",
    priority: "high",
    completed: false,
    dueDate: new Date(),
    category: "development",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const { toast } = useToast();

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Category filter
      const categoryMatch = selectedCategory === "all" || 
        (selectedCategory === "today" && task.dueDate && 
         task.dueDate.toDateString() === new Date().toDateString()) ||
        (selectedCategory === "upcoming" && task.dueDate && 
         task.dueDate > new Date() && !task.completed) ||
        (selectedCategory === "completed" && task.completed);

      // Search filter
      const searchMatch = !searchQuery || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [tasks, selectedCategory, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(t => 
      t.dueDate && t.dueDate < new Date() && !t.completed
    ).length;

    return { total, completed, pending, overdue };
  }, [tasks]);

  const handleToggleComplete = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task marked as pending" : "Task completed!",
        description: `"${task.title}" has been ${task.completed ? 'reopened' : 'completed'}.`,
      });
    }
  };

  const handleCreateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Task created!",
      description: `"${taskData.title}" has been added to your tasks.`,
    });
  };

  const handleEditTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditingTask(task);
      setIsFormOpen(true);
    }
  };

  const handleUpdateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!editingTask) return;
    
    setTasks(prev =>
      prev.map(task =>
        task.id === editingTask.id
          ? { ...task, ...taskData }
          : task
      )
    );
    
    setEditingTask(undefined);
    toast({
      title: "Task updated!",
      description: `"${taskData.title}" has been updated.`,
    });
  };

  const handleDeleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));
    
    if (task) {
      toast({
        title: "Task deleted",
        description: `"${task.title}" has been removed.`,
        variant: "destructive"
      });
    }
  };

  const handleNewTask = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <TaskSidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewTask={handleNewTask}
      />

        {/* Main Content */}
        <main className="flex-1 overflow-auto custom-scrollbar">
          {/* Enhanced Header */}
          <header className="glass-morphism border-b border-border/50 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent capitalize">
                  {selectedCategory === "all" ? "All Tasks" : selectedCategory}
                </h2>
                <p className="text-muted-foreground mt-1 font-medium">
                  {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                </p>
              </div>

              {/* Enhanced Statistics */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-accent-light border border-accent/20">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">{stats.completed} Completed</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-warning-light border border-warning/20">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-sm font-semibold text-warning">{stats.pending} Pending</span>
                </div>
                {stats.overdue > 0 && (
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-destructive-light border border-destructive/20 animate-pulse">
                    <Calendar className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-semibold text-destructive">
                      {stats.overdue} Overdue
                    </span>
                  </div>
                )}
              </div>
            </div>
          </header>

        {/* Tasks */}
        <div className="p-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="hero-gradient rounded-lg p-8 max-w-md mx-auto">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {searchQuery ? "No tasks found" : "No tasks yet"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? "Try adjusting your search or filter criteria"
                    : "Create your first task to get started with better productivity"
                  }
                </p>
                {!searchQuery && (
                  <Button 
                    onClick={handleNewTask}
                    className="btn-gradient text-primary-foreground"
                  >
                    Create Your First Task
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task, index) => (
                <div 
                  key={task.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TaskCard
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Task Form */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        initialTask={editingTask}
      />
    </div>
  );
};

export default Index;