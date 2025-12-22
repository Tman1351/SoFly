# Frontend Setup for Backend Connection

## ✅ Current Configuration

The frontend is **already configured** to work with the FastAPI backend!

### How it works:

1. **Frontend Hook** (`app/hooks/useWaitlistForm.ts`)
   - Calls backend directly: `http://localhost:8000/api/waitlist`
   - Uses `NEXT_PUBLIC_BACKEND_URL` environment variable

2. **Next.js API Route** (`app/api/waitlist/route.ts`)
   - Proxy route (deprecated, but kept as fallback)
   - Frontend calls backend directly, so this isn't needed

## 🔧 Setup Required

### Create `.env.local` file

Create `frontend/sofly-app/.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**For production**, update to your backend URL:
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

## ✅ Verification

1. **Backend running** on `http://localhost:8000`
2. **Frontend running** on `http://localhost:3000`
3. **`.env.local`** created with `NEXT_PUBLIC_BACKEND_URL`

## 🔄 Data Flow

```
User submits form
    ↓
EmailWaitlistForm component
    ↓
useWaitlistForm hook
    ↓
POST http://localhost:8000/api/waitlist
    ↓
FastAPI backend
    ↓
Supabase database
```

## 🧪 Test It

1. Start backend: `cd backend && python run.py`
2. Start frontend: `cd frontend/sofly-app && npm run dev`
3. Submit email in form
4. Check Supabase dashboard → `waitlist` table

Everything is configured! Just create the `.env.local` file.

