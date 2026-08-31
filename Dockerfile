FROM python:3.12-slim

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY backend ./backend
COPY model ./model
COPY sitemap.xml ./sitemap.xml

# CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port $PORT"]
CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8001}"]

