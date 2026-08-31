from fastapi import FastAPI
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from backend.predictor import predict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def sugar():
    print('hello')

@app.get("/sitemap.xml")
def sitemap():
    return FileResponse("../sitemap.xml", media_type="application/xml")

@app.post('/upload')
def pre(file: UploadFile = File(...)):
  
    l = predict(file.file)
    
    return l
