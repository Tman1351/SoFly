# Production Setup Guide

This guide covers deploying both the frontend and backend to production.

## Environment Variables

### Frontend (Next.js / Vercel)

Set these in your Vercel project settings or `.env.production`:

```bash
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

### Backend (FastAPI / Render/Railway)

Set these in your hosting platform's environment variables:

```bash
# Supabase credentials
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

# CORS - Add your production frontend URL
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com

# Optional: Port (defaults to 8000)
PORT=8000
```

## Deployment Steps

### Frontend (Vercel)

1. **Connect your GitHub repo** to Vercel
2. **Set root directory** to `frontend/sofly-app`
3. **Add environment variable**:
   - `NEXT_PUBLIC_BACKEND_URL` = your backend URL
4. **Deploy** - Vercel will auto-detect Next.js and build

### Backend (Render/Railway)

1. **Create a new service** (Web Service)
2. **Set build command**: `pip install -r requirements.txt`
3. **Set start command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. **Set root directory** to `backend`
5. **Add environment variables** (see above)
6. **Deploy**

## Important Notes

### CORS Configuration
- The backend now reads `ALLOWED_ORIGINS` from environment variables
- **Always include your production frontend URL** in production
- Format: `https://domain.com,https://www.domain.com` (comma-separated)

### Backend URL
- Frontend uses `NEXT_PUBLIC_BACKEND_URL` to call the backend
- Must be set in production or it will default to `http://localhost:8000` (won't work!)

### Health Checks
- Backend has `/health` endpoint for monitoring
- Frontend can check backend status before making requests

## Testing Production Locally

1. **Backend**: Run with production-like settings:
   ```bash
   cd backend
   export ALLOWED_ORIGINS="http://localhost:3000"
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

2. **Frontend**: Build and run:
   ```bash
   cd frontend/sofly-app
   export NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
   npm run build
   npm start
   ```

## Troubleshooting

### CORS Errors
- Check `ALLOWED_ORIGINS` includes your exact frontend URL (with/without www)
- Check backend logs for CORS rejection messages

### Connection Errors
- Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly
- Check backend is running and accessible
- Test backend health endpoint: `curl https://your-backend-url.com/health`

### Build Errors
- Frontend: Check Node.js version (should be 18+)
- Backend: Check Python version (should be 3.9+)

