import os
import pytest
from fastapi.testclient import TestClient

# We need to set BASE_DIR explicitly for tests so they find the ml artifacts correctly.
# The app's config uses os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
# which works regardless of where the test is run.

from app.main import app
from app.model_service import model_service

# Load the model manually for the test client (since lifespan is not always triggered by TestClient in the same way depending on pytest setup)
@pytest.fixture(autouse=True)
def load_model():
    model_service.load_model()
    yield

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["model_loaded"] is True

def test_model_info():
    response = client.get("/model-info")
    assert response.status_code == 200
    data = response.json()
    assert "model_name" in data
    assert data["model_name"] == "XGBoost"

def test_predict_valid_input():
    valid_data = {
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
    response = client.post("/predict", json=valid_data)
    assert response.status_code == 200
    data = response.json()
    assert "predicted_traffic_volume" in data
    
    pred = data["predicted_traffic_volume"]
    assert isinstance(pred, (int, float))
    assert pred >= 0

def test_predict_invalid_input():
    invalid_data = {
        "temp": 288.5,
        "rain_1h": 0.0,
        "snow_1h": 0.0,
        "clouds_all": 40,
        "weather_main": "Clear",
        "hour_of_day": 25,  # Invalid hour
        "day_of_week": 2,
        "month": 10,
        "is_holiday": 0
    }
    response = client.post("/predict", json=invalid_data)
    assert response.status_code == 422
