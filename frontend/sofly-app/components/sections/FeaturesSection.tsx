"use client";

import { Radio, Users, Camera, Share2, Globe, History } from "lucide-react";
import SectionContainer from "../SectionContainer";
import SectionHeader from "../SectionHeader";
import { AuroraText } from "@/components/ui/aurora-text";
import { FeatureCard } from "@/components/FeatureCard";

export default function FeaturesSection() {
  const features = [
    { icon: Radio, title: "Live Tracking and Updates", desc: "Track your flights in real-time and get updates on your flight status, delays, and gate changes" },
    { icon: Users, title: "Family Tracking", desc: "Track up to 5 family members' flights" },
    { icon: Camera, title: "Memory-First", desc: "Add photos and notes to every flight" },
    { icon: Share2, title: "Share Flights", desc: "Beautiful flight cards you can post on social media" },
    { icon: Globe, title: "Visual Journey", desc: "3D globe showing your travel story" },
    { icon: History, title: "Year Wrapped", desc: "Spotify-style annual flight recap" },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-white">
      <SectionContainer>
        <SectionHeader
          title={
            <>
              <AuroraText
                className="text-3xl md:text-5xl px-2 py-1 inline-block relative md:-bottom-1"
                colors={["#F58529", "#FEDA77", "#DD2A7B", "#8134AF", "#515BD4"]}
              >
                Instagram
              </AuroraText>
              <span className="text-3xl md:text-5xl align-middle mr-1">meets</span>
              <AuroraText
                className="text-3xl md:text-5xl px-2 py-1 inline-block align-middle -ml-1"
                colors={["#0A1442", "#0D1B5C", "#1A2B7A", "#2441A8", "#2D4FB8"]}
              >
                Flighty
              </AuroraText>
            </>
          }
          description="A complete flight journal with tracking, memories, and sharing"
          animateTitle={false}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
              delay={0.1 + idx * 0.1}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
