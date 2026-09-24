import joblib
import json
import pandas as pd
from typing import Dict, Any
from .config import MODEL_PATH, METADATA_PATH
from .schemas import PredictionRequest

class ModelService:
    def __init__(self):
        self.model = None
        self.metadata = None
        
    def load_model(self):
        try:
            self.model = joblib.load(MODEL_PATH)
            with open(METADATA_PATH, 'r') as f:
                self.metadata = json.load(f)
            return True
        except Exception as e:
            print(f"CRITICAL: Failed to load model or metadata: {str(e)}")
            return False
            
    def predict(self, request: PredictionRequest) -> float:
        if self.model is None:
            raise ValueError("Model is not loaded.")
        
        # Convert request to pandas DataFrame
        data = {
            'temp': [request.temp],
            'rain_1h': [request.rain_1h],
            'snow_1h': [request.snow_1h],
            'clouds_all': [request.clouds_all],
            'weather_main': [request.weather_main],
            'hour_of_day': [request.hour_of_day],
            'day_of_week': [request.day_of_week],
            'month': [request.month],
            'is_holiday': [request.is_holiday]
        }
        df = pd.DataFrame(data)
        
        # The pipeline handles all preprocessing
        prediction = self.model.predict(df)
        return float(prediction[0])
        
    def get_metadata(self) -> Dict[str, Any]:
        if self.metadata is None:
            raise ValueError("Metadata is not loaded.")
        return self.metadata

model_service = ModelService()
