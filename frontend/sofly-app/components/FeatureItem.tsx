"use client";

import { LucideIcon } from "lucide-react";

interface FeatureItemProps {
  icon: LucideIcon;
  children: React.ReactNode;
  align?: "start" | "center";
  className?: string;
}

export default function FeatureItem({ 
  icon: Icon, 
  children, 
  align = "start",
  className = ""
}: FeatureItemProps) {
  const alignClasses = align === "start" ? "items-start" : "items-center justify-center";
  
  return (
    <div className={`flex ${alignClasses} gap-4 ${className}`}>
      <Icon className="w-6 h-6 text-[#0062B8] flex-shrink-0 mt-1" />
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">{children}</div>
    </div>
  );
}

