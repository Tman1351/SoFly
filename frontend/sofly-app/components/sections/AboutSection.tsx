"use client";

import { Plane, CircleFadingPlus, Bell, History } from "lucide-react";
import SectionContainer from "../SectionContainer";
import SectionHeader from "../SectionHeader";
import FeatureItem from "../FeatureItem";
import AnimatedWrapper from "../AnimatedWrapper";
import { Highlighter } from "@/components/ui/highlighter";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-gray-50">
      <SectionContainer>
        <SectionHeader
          title={
            <>
            What is <Highlighter action="highlight" color="#fbf719">SoFly</Highlighter>?
            </>
          }
          titleClassName="mb-12 pb-4"
          withBorder
        />
        <div className="max-w-3xl mx-auto space-y-8 text-lg text-gray-700">
          {/* Feature 1 - Main value prop */}
          <AnimatedWrapper animation="slideUp" delay={0.1} duration={0.5}>
            <FeatureItem icon={Plane}>
              <span className="text-gray-900 font-semibold text-xl">SoFly is your travel journal that tracks itself.</span>
              {' '}Log flights in seconds, add photos and notes, and watch your journey come to life on a beautiful 3D globe.
            </FeatureItem>
          </AnimatedWrapper>
          
          {/* Feature 2 - Shareable cards */}
          <AnimatedWrapper animation="slideUp" delay={0.2} duration={0.5}>
            <FeatureItem icon={CircleFadingPlus}>
              Every flight becomes a stunning shareable card perfect for{' '}
              <span className="text-gray-900 font-semibold">Instagram Stories</span>
            </FeatureItem>
          </AnimatedWrapper>
          
          {/* Feature 3 - Tracking*/}
          <AnimatedWrapper animation="slideUp" delay={0.3} duration={0.5}>
            <FeatureItem icon={Bell}>
              <div className="mb-3">
                Get real-time flight tracking, delay notifications, and calendar sync when you need it.
              </div>
            </FeatureItem>
          </AnimatedWrapper>

          {/* Feature 4 Year Wrapped */}
          <AnimatedWrapper animation="slideUp" delay={0.4} duration={0.5}>
            <FeatureItem icon={History} align="center">
              <div className="text-center">
                <span className="text-gray-900 font-semibold">Year Wrapped</span> shows everywhere you flew in an epic visual recap
              </div>
            </FeatureItem>
          </AnimatedWrapper>
          
          {/* Final benefit */}
          <AnimatedWrapper animation="fadeIn" delay={0.5} duration={0.6}>
            <div className="pt-4 border-t border-gray-200 text-center">
              <p className="text-gray-900 font-semibold text-xl leading-relaxed">
                Whether you're preserving memories, tracking live flights, or sharing your travel story, SoFly is the only app that does it all—beautifully.
              </p>
            </div>
          </AnimatedWrapper>
        </div>
      </SectionContainer>
    </section>
  );
}

