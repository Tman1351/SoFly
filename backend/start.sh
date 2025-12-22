#!/bin/bash
# Production start script for Render
# Uses PORT environment variable provided by Render

exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}

