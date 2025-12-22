"use client";

import { useState } from "react";
import { Plane, Mail, Send, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import { toast } from "sonner";

type ContactReason = "general" | "support" | "business";

const REASON_OPTIONS: { value: ContactReason; label: string; email: string }[] = [
  { value: "general", label: "General", email: "contact@sofly.app" },
  { value: "support", label: "Support", email: "support@sofly.app" },
  { value: "business", label: "Business Inquiry", email: "sales@sofly.app" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "" as ContactReason | "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const toastId = toast.loading("Sending your message...", {
      description: "Please wait while we process your request",
    });

    try {
      // Get the email for the selected reason
      const selectedReason = REASON_OPTIONS.find((opt) => opt.value === formData.reason);
      const reasonEmail = selectedReason?.email || "contact@sofly.app";

      // Prepare form data for Web3Forms
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("access_key", "56cc95bf-07dc-4456-bfa5-6421efe2d3a4");
      formDataToSubmit.append("subject", `Contact Form - ${selectedReason?.label || "General"}`);
      formDataToSubmit.append("to", reasonEmail);
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("reason", selectedReason?.label || "General");
      formDataToSubmit.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSubmit,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent!", {
          id: toastId,
          description: "We'll get back to you as soon as possible.",
          duration: 5000,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          reason: "" as ContactReason | "",
          message: "",
        });
      } else {
        throw new Error(data.message || data.error || "Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message", {
        id: toastId,
        description: error instanceof Error ? error.message : "Please try again later or email us directly.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReasonChange = (value: ContactReason) => {
    setFormData({
      ...formData,
      reason: value,
    });
  };

  const selectedReason = REASON_OPTIONS.find((opt) => opt.value === formData.reason);
  const contactEmail = selectedReason?.email || "contact@sofly.app";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <AnimatedWrapper animation="fadeIn" delay={0.1} duration={0.6}>
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0062B8] to-[#1E88E5] flex items-center justify-center">
                    <Mail className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Get in Touch
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Have a question or want to learn more about SoFly? We'd love to hear from you.
                </p>
              </div>
            </AnimatedWrapper>

            {/* Contact Form */}
            <AnimatedWrapper animation="slideUp" delay={0.3} duration={0.6}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="text-lg h-12 border-2"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="text-lg h-12 border-2"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Reason */}
                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-gray-700">
                      Reason
                    </Label>
                    <Select
                      value={formData.reason}
                      onValueChange={handleReasonChange}
                      disabled={isSubmitting}
                      required
                    >
                      <SelectTrigger
                        id="reason"
                        className="h-12 text-lg border-2 data-[placeholder]:text-gray-400 data-[placeholder]:text-sm"
                      >
                        <SelectValue placeholder="Select a reason..." className="text-gray-400 text-sm data-[placeholder]:text-sm" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2">
                        {REASON_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700">
                      Message
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more..."
                      required
                      rows={6}
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0062B8] focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-lg bg-[#0062B8] hover:bg-[#0052a3] text-white"
                    aria-label={isSubmitting ? "Sending message" : "Send message"}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </AnimatedWrapper>

            {/* Alternative Contact Info */}
            <AnimatedWrapper animation="fadeIn" delay={0.5} duration={0.4}>
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">
                  Prefer to email us directly?
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-[#0062B8] hover:text-[#0052a3] hover:underline font-medium text-lg"
                >
                  {contactEmail}
                </a>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

