"use client";

import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextAnimate } from "@/components/ui/text-animate";
import SectionContainer from "../SectionContainer";
import AnimatedWrapper from "../AnimatedWrapper";
import { useWaitlistForm } from "@/app/hooks/useWaitlistForm";
import { scrollToSection } from "@/lib/scrollUtils";

export default function CTASection() {
  const { email, setEmail, status, handleSubmit } = useWaitlistForm();

  return (
    <section id="cta" className="py-16 sm:py-20 md:py-32 bg-gradient-to-br from-[#0062B8] via-[#1E88E5] to-[#0062B8] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
      </div>

      <SectionContainer className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <AnimatedWrapper animation="scaleUp" delay={0.1} duration={0.6}>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Plane className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
            </div>
          </AnimatedWrapper>

          {/* Headline */}
          <AnimatedWrapper animation="fadeIn" delay={0.2} duration={0.6}>
            <TextAnimate
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              by="word"
              animation="fadeIn"
              delay={0.3}
              duration={0.5}
              startOnView={true}
              once={true}
            >
              Ready to start your travel journey?
            </TextAnimate>
          </AnimatedWrapper>

          {/* Subheadline */}
          <AnimatedWrapper animation="slideUp" delay={0.4} duration={0.6}>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              Join thousands of travelers who can't wait to track their flights and preserve their memories with SoFly.
            </p>
          </AnimatedWrapper>

          {/* Email Form */}
          <AnimatedWrapper animation="slideUp" delay={0.6} duration={0.6}>
            <div className="max-w-2xl w-full mx-auto bg-white/10 backdrop-blur-md rounded-2xl px-6 sm:px-8 md:px-10 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 lg:pb-12 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 text-left">
                  <Label htmlFor="cta-email" className="text-white text-xl">
                    Email
                  </Label>
                  <Input
                    id="cta-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full text-lg sm:text-xl h-14 sm:h-16 border-2 border-white/30 bg-white/20 text-white placeholder:text-md sm:placeholder:text-lg placeholder:text-white/60 focus:border-white/50 focus:ring-2 focus:ring-white/20"
                    disabled={status === "loading"}
                  />
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-14 sm:h-16 text-lg sm:text-xl bg-white text-[#0062B8] hover:bg-white/90 font-semibold transition-all"
                    aria-label={status === "loading" ? "Submitting email" : "Join waitlist"}
                  >
                    {status === "loading" ? "Joining..." : "Join Waitlist"}
                  </Button>
                </div>
              </form>
              <p className="text-sm sm:text-base text-white/70 text-center mt-6 sm:mt-8 px-2">
                By clicking "Join Waitlist" I agree to join the waitlist and receive emails from SoFly.
              </p>
            </div>
          </AnimatedWrapper>

          {/* Alternative CTA */}
          <AnimatedWrapper animation="fadeIn" delay={0.8} duration={0.4}>
            <p className="mt-8 text-white/80 text-sm">
              Already on the list?{" "}
              <button
                onClick={() => scrollToSection("about")}
                className="text-white font-semibold hover:underline"
                aria-label="Learn more about SoFly"
              >
                Learn more.
              </button>
            </p>
          </AnimatedWrapper>
        </div>
      </SectionContainer>
    </section>
  );
}

