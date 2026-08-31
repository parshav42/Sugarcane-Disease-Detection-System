from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pathlib import Path

from backend.predictor import predict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def sugar():
    return {"message": "Sugarcane Disease Detection API"}

@app.get("/sitemap.xml")
def sitemap():
    sitemap_path = Path(__file__).resolve().parent.parent / "sitemap.xml"
    return FileResponse(sitemap_path, media_type="application/xml")

@app.post("/upload")
def pre(file: UploadFile = File(...)):
    l = predict(file.file)
    return l