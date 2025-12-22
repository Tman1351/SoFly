import { useState } from "react";
import { toast } from "sonner";

type FormStatus = "idle" | "loading" | "success" | "error";

interface UseWaitlistFormReturn {
  email: string;
  setEmail: (email: string) => void;
  status: FormStatus;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useWaitlistForm(): UseWaitlistFormReturn {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const toastId = toast.loading("Adding you to the waitlist...", {
      description: "Please wait while we process your request",
    });

    try {
      // Call backend API instead of Next.js API route
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/api/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        setStatus("error");
        toast.error("Invalid server response", {
          id: toastId,
          description: "The server returned an unexpected response. Please try again.",
          duration: 5000,
        });
        return;
      }

      if (response.ok) {
        setStatus("success");
        toast.success("You're on the list!", {
          id: toastId,
          description: data.message || "We'll notify you when we launch.",
          duration: 5000,
        });
        setEmail("");
      } else {
        setStatus("error");
        // FastAPI returns 'detail' for errors, not 'error'
        const errorMessage = data.detail || data.error || "Something went wrong. Please try again.";
        toast.error("Failed to join waitlist", {
          id: toastId,
          description: errorMessage,
          duration: 5000,
        });
      }
    } catch (error) {
      setStatus("error");
      toast.error("Connection error", {
        id: toastId,
        description: "Unable to connect to the server. Please try again later.",
        duration: 5000,
      });
    }
  };

  return {
    email,
    setEmail,
    status,
    handleSubmit,
  };
}

