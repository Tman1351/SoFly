"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedWrapper from "./AnimatedWrapper";
import { useWaitlistForm } from "@/app/hooks/useWaitlistForm";

export default function EmailWaitlistForm() {
  const { email, setEmail, status, handleSubmit } = useWaitlistForm();

  return (
    <>
      <AnimatedWrapper animation="slideUp" delay={0.7} duration={0.6}>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="text-lg h-12 border-2"
            disabled={status === "loading"}
          />
        </div>
        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full h-12 text-lg bg-[#0062B8] hover:bg-[#0052a3] text-white"
          aria-label={status === "loading" ? "Submitting email" : "Join waitlist"}
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </Button>
        </form>
      </AnimatedWrapper>

      {/* Legal Text */}
      <AnimatedWrapper animation="fadeIn" delay={0.9} duration={0.4}>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 leading-relaxed">
          By clicking "Join Waitlist" I agree to join the waitlist and receive emails from SoFly.
        </p>
      </AnimatedWrapper>

      {/* Already signed up link */}
      <AnimatedWrapper animation="fadeIn" delay={1.0} duration={0.4}>
        <p className="mt-6">
          <Link href="/contact" className="text-[#0062B8] dark:text-[#1E88E5] hover:text-[#0052a3] hover:underline text-sm font-medium transition-colors">
            Want to contact us?
          </Link>
        </p>
      </AnimatedWrapper>
    </>
  );
}

