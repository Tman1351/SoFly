import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Stat {
  value: string | number;
  label: string;
}

interface StatsCardProps {
  title: string;
  mainValue: string | number;
  mainLabel: string;
  stats: Stat[];
  onHeaderClick?: () => void;
}

export default function StatsCard({ 
  title, 
  mainValue, 
  mainLabel, 
  stats,
  onHeaderClick
}: StatsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-[#0062B8] to-[#1E88E5] border-0 rounded-2xl p-5 shadow-lg text-white hover:shadow-xl hover:opacity-95 transition-all cursor-pointer">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-white/80 font-medium hover:text-white transition-colors">
            {title}
          </p>
          {onHeaderClick && (
            <button
              type="button"
              onClick={onHeaderClick}
              className="w-5 h-5 text-white hover:text-white/80 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
              aria-label="Open external link"
            >
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-5xl font-bold hover:text-white/80 transition-colors">
            {mainValue}
          </span>
          <span className="text-white/90 text-lg hover:text-white/80 transition-colors">
            {mainLabel}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <p className="text-2xl font-bold hover:text-white/80 transition-colors">
                {stat.value}
              </p>
              <p className="text-xs text-white/80 mt-1 hover:text-white/80 transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

