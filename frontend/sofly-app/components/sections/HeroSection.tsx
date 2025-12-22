"use client";

import { Plus, User, Home as HomeIcon, PlaySquare, Plane, Search } from "lucide-react";
import RecentFlight from "../RecentFlight";
import { Button } from "@/components/ui/button";
import AnimatedParticles from "@/components/ui/animated-particles";
import { IphoneWithContent } from "@/components/ui/iphone-with-content";
import { TextAnimate } from "@/components/ui/text-animate";
import EmailWaitlistForm from "../EmailWaitlistForm";
import AppStatusBar from "../AppStatusBar";
import StatsCard from "../StatsCard";
import BottomNav from "../BottomNav";
import AnimatedWrapper from "../AnimatedWrapper";

export default function HeroSection() {

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center pt-16 bg-white overflow-hidden">
      <AnimatedParticles className="opacity-40" quantity={20} />
      <div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] relative z-10">
        {/* Left Side - Phone Mockup */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-50 via-blue-100/30 to-indigo-50 flex items-center justify-center p-8 lg:p-16">
          <AnimatedWrapper animation="slideRight" delay={0.3} duration={0.8} className="relative w-full flex flex-col items-center">
            {/* Phone Frame - Using Magic UI iPhone */}
            <div className="relative mx-auto w-[380px] md:w-[420px] flex-shrink-0 transition-transform duration-500 ease-out hover:scale-[1.02] cursor-pointer">
              <IphoneWithContent className="w-full z-10">
                <div className="w-full h-full bg-white overflow-hidden relative flex flex-col">
                  <AppStatusBar />
                  
                  {/* App Content */}
                  <div className="pt-14 pb-20 flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white hide-scrollbar">
                    <div className="p-5 space-y-5">
                      {/* Header */}
                      <AnimatedWrapper animation="fadeIn" delay={0.2} duration={0.4}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">My Flights</h2>
                            <p className="text-sm text-gray-500 mt-0.5">Your travel story</p>
                          </div>
                          <Button 
                            size="icon"
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0062B8] to-[#1E88E5] hover:from-[#0052a3] hover:to-[#1878d3] shadow-md"
                            aria-label="Add new flight"
                          >
                            <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
                          </Button>
                        </div>
                      </AnimatedWrapper>

                      {/* Stats Card with gradient */}
                      <AnimatedWrapper animation="scaleUp" delay={0.4} duration={0.6}>
                        <StatsCard
                          title="2025 Passport"
                          mainValue="67"
                          mainLabel="flights"
                          stats={[
                            { value: "41", label: "Countries" },
                            { value: "89k", label: "Miles" },
                            { value: "156h", label: "In Air" },
                          ]}
                        />
                      </AnimatedWrapper>

                      {/* Recent Flights */}
                      <AnimatedWrapper animation="slideUp" delay={0.5} duration={0.5}>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent</h3>
                          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 hide-scrollbar">
                          {[
                            {
                              departure: "JFK",
                              arrival: "LAX",
                              date: "Today • 5h 30m", 
                              status: "Live" as const, 
                              tracking: "Live",
                              photoUrls: process.env.NODE_ENV === "development"
                                ? [
                                    "https://picsum.photos/seed/jfk-lax-2/200/200",
                                    "https://picsum.photos/seed/jfk-lax-3/200/200",
                                    "https://picsum.photos/seed/jfk-lax-4/200/200",
                                  ]
                                : [
                                    // TODO: Replace with actual CDN/S3 image URLs in production
                                    "/imgs/flight-placeholder-1.jpg",
                                    "/imgs/flight-placeholder-2.jpg",
                                    "/imgs/flight-placeholder-3.jpg",
                                  ],
                              isLanding: true
                            },
                            { 
                              departure: "LAX",
                              arrival: "APC",
                              date: "Feb 18 • 11h 20m", 
                              photos: 8,
                              photoUrls: process.env.NODE_ENV === "development"
                                ? [
                                    "https://picsum.photos/seed/sfo-nrt-1/200/200",
                                    "https://picsum.photos/seed/sfo-nrt-2/200/200",
                                    "https://picsum.photos/seed/sfo-nrt-3/200/200",
                                    "https://picsum.photos/seed/sfo-nrt-4/200/200",
                                  ]
                                : [
                                    // TODO: Replace with actual CDN/S3 image URLs in production
                                    "/imgs/flight-placeholder-1.jpg",
                                    "/imgs/flight-placeholder-2.jpg",
                                    "/imgs/flight-placeholder-3.jpg",
                                    "/imgs/flight-placeholder-4.jpg",
                                  ],
                              isLanding: true
                            },
                            { 
                              departure: "SFO",
                              arrival: "LAX", 
                              date: "Feb 11 • 1h 15m", 
                              photos: 3,
                              photoUrls: process.env.NODE_ENV === "development"
                                ? [
                                    "https://picsum.photos/seed/lax-sfo-1/200/200",
                                    "https://picsum.photos/seed/lax-sfo-2/200/200",
                                  ]
                                : [
                                    // TODO: Replace with actual CDN/S3 image URLs in production
                                    "/imgs/flight-placeholder-1.jpg",
                                    "/imgs/flight-placeholder-2.jpg",
                                  ],
                              isLanding: true
                            },
                          ].map((flight, idx) => (
                            <RecentFlight
                              key={idx}
                              departure={flight.departure}
                              arrival={flight.arrival}
                              date={flight.date}
                              status={flight.status}
                              photos={flight.photos}
                              photoUrls={flight.photoUrls}
                              tracking={flight.tracking}
                              isLanding={flight.isLanding}
                            />
                          ))}
                          </div>
                        </div>
                      </AnimatedWrapper>
                    </div>
                  </div>

                  <BottomNav
                    items={[
                      { icon: HomeIcon, active: false, label: "Home" },
                      { icon: PlaySquare, active: false, label: "Stories" },
                      { icon: Plane, active: true, label: "Flights" },
                      { icon: Search, active: false, label: "Search" },
                      { icon: User, active: false, label: "Profile", isAvatar: true},
                    ]}
                  />
                </div>
              </IphoneWithContent>
            </div>
          </AnimatedWrapper>
        </div>

        {/* Right Side - Content */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
          <div className="max-w-2xl w-full">
            {/* Main Headline - Multi-line */}
            <TextAnimate
              as="h1"
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight"
              by="word"
              animation="blurInUp"
              delay={0.2}
              duration={0.6}
              startOnView={true}
              once={true}
            >
              Your travel story, automatically organized
            </TextAnimate>
            {/* Sub-headline */}
            <TextAnimate
              as="p"
              className="text-2xl md:text-3xl text-gray-600 mb-10"
              by="word"
              animation="fadeIn"
              delay={0.5}
              duration={0.5}
              startOnView={true}
              once={true}
            >
              Track flights, preserve memories, and share your journey
            </TextAnimate>

            <EmailWaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}

