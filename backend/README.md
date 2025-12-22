# SoFly Backend API

Simple FastAPI backend for connecting frontend to Supabase.

## Quick Start

### 1. Install Dependencies

```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Create `.env` File

Create `backend/.env`:

```env
SUPABASE_URL=https://lscahmektuhsmbfiiapa.supabase.co
SUPABASE_KEY=your-service-role-key-here
```

**Get your service_role key:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Settings → API
3. Copy the **service_role** key (not anon key)

### 3. Run the Server

```bash
python run.py
```

Server will start at: `http://localhost:8000`

## API Endpoints

### `POST /api/waitlist`
Add email to waitlist

**Request:**
```json
{
  "email": "user@example.com",
  "source": "landing-page"
}
```

**Response:**
```json
{
  "success": true,
  "message": "You're on the list! We'll notify you when we launch."
}
```

### `GET /health`
Health check endpoint

## Project Structure

```
backend/
├── app/
│   └── main.py          # FastAPI app and routes
├── .env                  # Environment variables (create this)
├── requirements.txt      # Python dependencies
├── run.py               # Development server
└── README.md
```
