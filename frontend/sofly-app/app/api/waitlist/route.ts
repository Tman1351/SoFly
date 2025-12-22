import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/waitlist
 * 
 * DEPRECATED: This route now proxies to the FastAPI backend
 * The frontend should call the backend directly via useWaitlistForm hook
 * 
 * This route is kept for backwards compatibility but will be removed
 */
export async function POST(request: NextRequest) {
  // Proxy to backend API
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  
  try {
    const body = await request.json();
    
    const response = await fetch(`${backendUrl}/api/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    
    // Safely parse response - check content-type first
    const contentType = response.headers.get("content-type");
    let data;
    
    if (contentType && contentType.includes("application/json")) {
      try {
        data = await response.json();
      } catch (parseError) {
        // If JSON parsing fails, get raw text
        const rawText = await response.text();
        return NextResponse.json(
          {
            error: "Invalid JSON response from backend",
            rawResponse: rawText,
            status: response.status,
          },
          { status: 502 }
        );
      }
    } else {
      // Non-JSON response (HTML error page, timeout, etc.)
      const rawText = await response.text();
      return NextResponse.json(
        {
          error: "Backend returned non-JSON response",
          rawResponse: rawText,
          status: response.status,
        },
        { status: 502 }
      );
    }
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    // Log error in production without exposing details
    if (process.env.NODE_ENV === "development") {
      console.error("Error proxying to backend:", error);
    }
    return NextResponse.json(
      { error: "Failed to connect to backend API" },
      { status: 502 }
    );
  }
}


