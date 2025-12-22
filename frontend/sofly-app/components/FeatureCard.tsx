"use client";

import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextAnimate } from "@/components/ui/text-animate";
import AnimatedWrapper from "@/components/AnimatedWrapper";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  /**
   * Stagger delay for entrance animation
   */
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, desc, delay = 0.1 }: FeatureCardProps) {
  return (
    <AnimatedWrapper animation="slideUp" delay={delay} duration={0.5}>
      <Card className="group relative overflow-hidden border border-slate-200/80 bg-white/90 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg">
        {/* subtle gradient glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-300">
          <div className="absolute -inset-24 bg-gradient-to-br from-[#0062B8]/4 via-[#1E88E5]/6 to-transparent blur-3xl" />
        </div>

        <CardHeader>
          <div className="w-11 h-11 rounded-2xl bg-blue-50/70 flex items-center justify-center mb-4 ring-1 ring-blue-100/70 group-hover:bg-blue-100/70 group-hover:ring-blue-200/70 transition-colors duration-300">
            <Icon className="w-5 h-5 text-[#0062B8] group-hover:text-[#0b60b5] transition-colors duration-300" />
          </div>
          <CardTitle className="text-lg md:text-xl mb-1.5">
            <TextAnimate
              by="word"
              animation="fadeIn"
              delay={0.1}
              duration={0.3}
              startOnView={true}
              once={true}
              className="inline-block"
            >
              {title}
            </TextAnimate>
          </CardTitle>
          <hr/>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-slate-600">
            <TextAnimate
              by="word"
              animation="fadeIn"
              delay={0.2}
              duration={0.3}
              startOnView={true}
              once={true}
              className="inline-block"
            >
              {desc}
            </TextAnimate>
          </CardDescription>
        </CardContent>
      </Card>
    </AnimatedWrapper>
  );
}


