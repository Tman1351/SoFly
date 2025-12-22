# Email Storage Guide for Waitlist

## 📋 Current Architecture: **Proxy-to-Backend (FastAPI)**

The current implementation uses a Next.js API route that proxies requests to a FastAPI backend. This guide documents the actual implementation.

### Current Flow
✅ **Frontend** → Posts to `NEXT_PUBLIC_BACKEND_URL/api/waitlist`  
✅ **Next.js API Route** → Proxies to backend (for backwards compatibility)  
✅ **FastAPI Backend** → Handles storage and business logic  
✅ **Flexible** - Backend can use any storage (database, email service, etc.)  

---

## 🏗️ Architecture

```
User submits form (EmailWaitlistForm or CTASection)
    ↓
useWaitlistForm hook
    ↓
POST to NEXT_PUBLIC_BACKEND_URL/api/waitlist
    ↓
(Optional) Next.js API route (/api/waitlist) proxies to backend
    ↓
FastAPI Backend (/api/waitlist)
    ↓
Backend stores email (database, email service, etc.)
```

---

## 📍 Where to Put the Code

### 1. Frontend Hook (Current Implementation)
**Location:** `app/hooks/useWaitlistForm.ts`

The hook directly calls the backend API:
```typescript
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
const response = await fetch(`${backendUrl}/api/waitlist`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});
```

### 2. Next.js API Route (Proxy - Optional)
**Location:** `app/api/waitlist/route.ts`

This route proxies to the backend for backwards compatibility. It's marked as deprecated and may be removed in the future.

### 3. Backend API (FastAPI)
**Location:** `backend/app/routers/` (FastAPI router)

The backend handles:
- Email validation
- Storage (database, email service, etc.)
- Rate limiting
- Error handling

### 4. Environment Variables
**Location:** `.env.local` (frontend) and backend environment

**Frontend (.env.local):**
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**Backend:** Configure your database/email service credentials as needed.

---

## 🚀 Implementation Details

### Frontend Implementation

The frontend uses the `useWaitlistForm` hook which:
1. Calls the backend API directly via `NEXT_PUBLIC_BACKEND_URL`
2. Handles loading states
3. Shows toast notifications
4. Handles errors (FastAPI returns `detail` field for errors)

**Files:**
- `app/hooks/useWaitlistForm.ts` - Main hook
- `components/EmailWaitlistForm.tsx` - Form component
- `components/sections/CTASection.tsx` - CTA section form

### Next.js API Route (Proxy)

The route at `app/api/waitlist/route.ts`:
- Proxies requests to the backend
- Maintains backwards compatibility
- Will be removed in future versions

### Backend Requirements

The FastAPI backend should:
- Accept POST requests at `/api/waitlist`
- Expect JSON body: `{ "email": "user@example.com" }`
- Return success: `{ "message": "..." }` with 200 status
- Return errors: `{ "detail": "error message" }` with appropriate status codes

---

## 🔄 Alternative: Supabase Database (Future Option)

If you want to switch to a Supabase database-first approach:

### Step 1: Create Supabase Table

Go to Supabase Dashboard → SQL Editor → Run:

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT, -- Optional: track where signup came from
  subscribed BOOLEAN DEFAULT TRUE
);

-- Create index for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at);
```

### Step 2: Update Backend

Modify your FastAPI backend to:
1. Install `@supabase/supabase-js` or use Supabase Python client
2. Connect to Supabase in your backend
3. Store emails in the `waitlist` table

### Step 3: Environment Variables

**Backend:**
```
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-service-role-key
```

**Note:** Keep `NEXT_PUBLIC_BACKEND_URL` in frontend - it still points to your backend, which now uses Supabase.

---

## 📊 Expected API Contract

### Request
```typescript
POST /api/waitlist
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Success Response
```typescript
200 OK
{
  "message": "Successfully added to waitlist"
}
```

### Error Response
```typescript
400 Bad Request
{
  "detail": "Invalid email address"
}
```

---

## 🎯 Next Steps

1. ✅ Frontend hook implemented (`useWaitlistForm.ts`)
2. ✅ Next.js proxy route exists (`app/api/waitlist/route.ts`)
3. ✅ Backend API endpoint should be at `/api/waitlist`
4. 🔜 Configure `NEXT_PUBLIC_BACKEND_URL` in production
5. 🔜 Backend implements storage (database, email service, etc.)
6. 🔜 Add rate limiting in backend
7. 🔜 Add email validation in backend

