import { useState, useRef } from "react";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompletionBoxProps {
  completed: boolean;
  onToggle: () => void;
  className?: string;
}

export function CompletionBox({ completed, onToggle, className }: CompletionBoxProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleClick = () => {
    if (!completed) {
      // Trigger celebration animation for completing task
      setIsAnimating(true);
      setShowSparkles(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Reset animation state after animation completes
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setShowSparkles(false);
      }, 1200);
    }
    
    onToggle();
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={cn(
          "relative w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 group",
          completed
            ? "bg-gradient-completion border-accent text-accent-foreground shadow-completion"
            : "border-muted-foreground hover:border-primary hover:bg-primary/5",
          isAnimating && "completion-celebrate completion-ripple completion-glow",
          className
        )}
      >
        {/* Checkmark */}
        <Check 
          className={cn(
            "w-3.5 h-3.5 transition-all duration-200",
            completed 
              ? "scale-100 opacity-100" 
              : "scale-0 opacity-0"
          )} 
        />
        
        {/* Sparkles for celebration */}
        {showSparkles && (
          <div className="absolute inset-0">
            <Sparkles 
              className="absolute -top-1 -right-1 w-3 h-3 text-accent animate-ping"
              style={{ animationDelay: '0.1s' }}
            />
            <Sparkles 
              className="absolute -bottom-1 -left-1 w-2.5 h-2.5 text-secondary animate-ping"
              style={{ animationDelay: '0.3s' }}
            />
            <Sparkles 
              className="absolute top-0 -left-1 w-2 h-2 text-primary animate-ping"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
        )}
        
        {/* Hover effect overlay */}
        <div 
          className={cn(
            "absolute inset-0 rounded-lg transition-all duration-300",
            !completed && "group-hover:bg-primary/10"
          )}
        />
      </button>
      
      {/* Success ripple effect */}
      {isAnimating && (
        <div 
          className="absolute inset-0 rounded-lg border-2 border-accent animate-ping"
          style={{ animationDuration: '0.6s' }}
        />
      )}
    </div>
  );
}