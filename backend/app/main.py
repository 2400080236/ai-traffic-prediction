from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .schemas import PredictionRequest
from .model_service import model_service

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    success = model_service.load_model()
    if not success:
        print("CRITICAL: Failed to load the selected model artifact. Ensure it exists at the correct path.")
    yield
    # Shutdown
    pass

app = FastAPI(
    title="AI-Based Traffic Prediction API",
    description="API for predicting traffic volume.",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "AI-Based Traffic Prediction API",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    loaded = model_service.model is not None
    return {
        "status": "healthy" if loaded else "degraded",
        "model_loaded": loaded
    }

@app.get("/model-info")
def model_info():
    try:
        return model_service.get_metadata()
    except ValueError as e:
        raise HTTPException(status_code=503, detail=str(e))

@app.post("/predict")
def predict_traffic(request: PredictionRequest):
    try:
        pred = model_service.predict(request)
        return {
            "predicted_traffic_volume": round(pred, 2),
            "unit": "vehicles/hour",
            "model": model_service.metadata.get("model_name", "Unknown") if model_service.metadata else "Unknown"
        }
    except ValueError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction failed: {str(e)}")
