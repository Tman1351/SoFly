import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  icon: LucideIcon;
  active?: boolean;
  label?: string;
  isAvatar?: boolean;
}

interface BottomNavProps {
  items: NavItem[];
}

export default function BottomNav({ items }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-xl border-t border-gray-200 flex items-center justify-around px-4">
      {items.map((item, idx) => {
        const IconComponent = item.icon;
        const iconName = item.label || IconComponent.name || `Navigation item ${idx + 1}`;
        const isAvatar = item.isAvatar;

        return (
          <Button
            key={idx}
            variant="ghost"
            size="icon"
            className="w-16 h-16 rounded-xl"
            aria-label={iconName}
            aria-current={item.active ? "page" : undefined}
          >
            {isAvatar ? (
              <div
                className={`flex items-center justify-center rounded-full border transition-colors w-8 h-8
                ${
                  item.active
                    ? "bg-[#0062B8] text-white border-[#0062B8]"
                    : "bg-slate-100 text-slate-500 border-slate-300"
                }`}
                aria-hidden="true"
              >
                <IconComponent
                  className="w-4 h-4"
                  strokeWidth={2}
                />
              </div>
            ) : (
              <IconComponent
                className={`w-5 h-5 transition-colors ${
                  item.active ? "text-[#0062B8]" : "text-black hover:text-gray-700"
                }`}
                strokeWidth={item.active ? 2.5 : 2}
                fill={item.active ? "currentColor" : "none"}
                aria-hidden="true"
              />
            )}
          </Button>
        );
      })}
    </div>
  );
}

