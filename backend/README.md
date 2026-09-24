# AI-Based Traffic Prediction Backend

This is the FastAPI backend for the AI-Based Traffic Prediction System. It serves the explicitly selected and versioned XGBoost machine learning model trained in Phase 2.

**Note**: This API performs *inference only*. It does not train or retrain models, nor does it automatically fetch the "latest" run from MLflow. It strictly loads the exact explicitly versioned artifact.

## Dependencies Installation
To install the dependencies, use pip:
```bash
pip install -r requirements.txt
```

## Running the Server
Start the FastAPI server using Uvicorn from the `backend` directory:
```bash
uvicorn app.main:app --reload
```
The API will be available at `http://127.0.0.1:8000`.

## Swagger Documentation
Once running, you can explore the API endpoints using the interactive Swagger UI at:
[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## API Endpoints
* `GET /` - Simple API description.
* `GET /health` - Health check and model loading status.
* `GET /model-info` - Metadata and metrics for the loaded model.
* `POST /predict` - Accepts traffic feature inputs and returns the predicted traffic volume.

### Example Prediction Request
```json
{
  "temp": 288.5,
  "rain_1h": 0.0,
  "snow_1h": 0.0,
  "clouds_all": 40,
  "weather_main": "Clear",
  "hour_of_day": 8,
  "day_of_week": 2,
  "month": 10,
  "is_holiday": 0
}
```

## Model Artifact
The model loaded by this API is located at `../ml/artifacts/selected_model/model.joblib`.
