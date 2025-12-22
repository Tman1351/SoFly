import { Plane } from "lucide-react";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export default function Logo({ 
  variant = "dark", 
  size = "md",
  className = "",
  showText = true 
}: LogoProps) {
  const sizeClasses = {
    sm: { icon: "w-4 h-4", text: "text-base", container: "w-6 h-6" },
    md: { icon: "w-6 h-6", text: "text-lg", container: "w-8 h-8" },
    lg: { icon: "w-8 h-8", text: "text-xl", container: "w-10 h-10" },
  };

  const textColor = variant === "dark" ? "text-gray-900" : "text-white";

  return (
    <div className={`flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${className}`}>
      <div className={`${sizeClasses[size].container} rounded-lg bg-gradient-to-br from-[#0062B8] to-[#1E88E5] flex items-center justify-center hover:opacity-90 transition-opacity`}>
        <Plane className={`${sizeClasses[size].icon} text-white`} strokeWidth={2} />
      </div>
      {showText && (
        <span className={`${sizeClasses[size].text} font-bold ${textColor}`}>SoFly</span>
      )}
    </div>
  );
}

