"""
SoFly Backend API
Simple FastAPI backend for connecting frontend to Supabase
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="SoFly API",
    description="Backend API for SoFly flight journal and tracker",
    version="0.1.0",
)

# CORS middleware
# Get allowed origins from environment variable or default to localhost for development
allowed_origins_str = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001")
allowed_origins = [origin.strip() for origin in allowed_origins_str.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client (lazy initialization)
supabase: Client | None = None


def get_supabase_client() -> Client:
    """Get or create Supabase client. Raises error if not configured."""
    global supabase
    if supabase is None:
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_KEY")

        if not supabase_url or not supabase_key:
            raise ValueError(
                "SUPABASE_URL and SUPABASE_KEY must be set in environment variables")

        supabase = create_client(supabase_url, supabase_key)
    return supabase


# Request/Response models
class WaitlistRequest(BaseModel):
    email: EmailStr
    source: str = "landing-page"


class WaitlistResponse(BaseModel):
    success: bool
    message: str


# Routes
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "ok",
        "message": "SoFly API is running",
        "version": "0.1.0"
    }


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.post("/api/waitlist", response_model=WaitlistResponse)
async def add_to_waitlist(request: WaitlistRequest):
    """
    Add email to waitlist

    - Validates email format
    - Checks for duplicates
    - Stores in Supabase
    """
    try:
        # Get Supabase client (will raise error if not configured)
        db = get_supabase_client()

        # Normalize email
        email = request.email.lower().strip()

        # Check if email already exists
        existing = db.table("waitlist").select(
            "email").eq("email", email).execute()

        if existing.data:
            raise HTTPException(
                status_code=409,
                detail="This email is already on the waitlist"
            )

        # Insert into database
        result = db.table("waitlist").insert({
            "email": email,
            "source": request.source,
            "subscribed": True
        }).execute()

        if not result.data:
            raise HTTPException(
                status_code=500,
                detail="Failed to add email to waitlist"
            )

        return WaitlistResponse(
            success=True,
            message="You're on the list! We'll notify you when we launch."
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )
