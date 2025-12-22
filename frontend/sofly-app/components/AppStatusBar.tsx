import { Plane, Menu } from "lucide-react";

export default function AppStatusBar() {
  const handleActivate = () => {
    // Navigate to home or perform action
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      handleActivate();
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-r from-[#0062B8] via-[#1E88E5] to-[#0062B8] flex items-center justify-between px-6 pt-2 z-10">
      <div 
        className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer" 
        role="button" 
        aria-label="SoFly home" 
        tabIndex={0}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
      >
        <Plane className="w-5 h-5 text-white" strokeWidth={2.5} aria-hidden="true" />
        <span className="text-white text-base font-bold tracking-tight">SoFly</span>
      </div>
      <button 
        className="text-white mb-1 hover:text-white/80 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}

