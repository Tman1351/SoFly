"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { scrollToSection as scrollToSectionUtil } from "@/lib/scrollUtils";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (id: string) => {
    // If we're on the home page, scroll to section
    if (pathname === "/") {
      scrollToSectionUtil(id);
    } else {
      // If we're on another page, navigate to home and then scroll
      router.push(`/#${id}`);
      // Small delay to ensure page loads before scrolling
      setTimeout(() => {
        scrollToSectionUtil(id);
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" aria-label="Go to home page">
            <Logo />
          </Link>

          {/* Desktop Navigation - Minimal */}
          <div className="hidden md:flex items-center gap-6">
            <Button
              onClick={() => scrollToSection("about")}
              variant="ghost"
              className="text-gray-700 hover:text-gray-900"
              aria-label="Navigate to About section"
            >
              About
            </Button>
            <Button
              onClick={() => scrollToSection("features")}
              variant="ghost"
              className="text-gray-700 hover:text-gray-900"
              aria-label="Navigate to FAQ section"
            >
              FAQ
            </Button>
            <Button
              onClick={() => scrollToSection("cta")}
              className="bg-[#0062B8] hover:bg-[#0052a3] text-white"
              aria-label="Join waitlist"
            >
              Join Waitlist
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => scrollToSection("about")}
                variant="ghost"
                className="justify-start text-gray-700 hover:text-gray-900"
              >
                About
              </Button>
              <Button
                onClick={() => scrollToSection("features")}
                variant="ghost"
                className="justify-start text-gray-700 hover:text-gray-900"
              >
                FAQ
              </Button>
              <Button
                onClick={() => scrollToSection("cta")}
                className="w-full bg-[#0062B8] hover:bg-[#0052a3] text-white"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

