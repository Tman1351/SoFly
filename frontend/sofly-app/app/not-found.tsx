"use client";

import { Plane, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "../components/Logo";
import AnimatedWrapper from "../components/AnimatedWrapper";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center pt-16 px-4 overflow-hidden relative">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-200 rounded-full opacity-30 animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-20 animate-pulse delay-300" />
          <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-indigo-200 rounded-full opacity-25 animate-pulse delay-700" />
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          {/* Big Plane Icon */}
          <AnimatedWrapper animation="fadeIn" delay={0.1} duration={0.6}>
            <div className="mb-12 flex justify-center">
              <Plane className="w-32 h-32 text-[#0062B8]" strokeWidth={1.5} />
            </div>
          </AnimatedWrapper>

          {/* 404 Text */}
          <AnimatedWrapper animation="fadeIn" delay={0.2} duration={0.6}>
            <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0062B8] via-[#1E88E5] to-[#0062B8] mb-4 leading-none">
              404
            </h1>
          </AnimatedWrapper>

          {/* Error Message */}
          <AnimatedWrapper animation="slideUp" delay={0.4} duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Looks like this page took off without us. Let's get you back on track.
            </p>
          </AnimatedWrapper>

          {/* Action Buttons */}
          <AnimatedWrapper animation="slideUp" delay={0.6} duration={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                className="bg-[#0062B8] hover:bg-[#0052a3] text-white px-8 py-6 text-lg"
              >
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // Try to go back, but fallback to home if no history
                  if (typeof window !== "undefined" && window.history.length > 1) {
                    router.back();
                  } else {
                    router.push("/");
                  }
                }}
                className="border-2 border-[#0062B8] text-[#0062B8] hover:bg-[#0062B8] hover:text-white px-8 py-6 text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>
          </AnimatedWrapper>

          {/* Additional Help Text */}
          <AnimatedWrapper animation="fadeIn" delay={0.8} duration={0.4}>
            <p className="mt-12 text-sm text-gray-500">
              Need help?{" "}
              <Link href="/contact" className="text-[#0062B8] hover:text-[#0052a3] hover:underline font-medium">
                Contact us
              </Link>
            </p>
          </AnimatedWrapper>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo variant="light" />
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              {/* TODO: Implement privacy and terms pages */}
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
              <span className="text-gray-500">© 2025 SoFly</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

