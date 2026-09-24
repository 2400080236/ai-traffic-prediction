# AI-Based Traffic Prediction System with MLOps

## 1. Problem Statement
Managing traffic flow requires accurate forecasting. This system addresses the need to predict hourly traffic volume on Interstate 94 Westbound in Minnesota, enabling better road management and travel planning.

## 2. Objective
The primary objective is to predict hourly traffic volume (number of vehicles) using historical traffic data combined with temporal, weather, and holiday-related features. By applying MLOps principles, the system ensures reproducibility, rigorous testing, and reliable inference serving.

## 3. Dataset
* **Source:** Metro Interstate Traffic Volume Dataset
* **Size:** 48,204 records
* **Target Variable:** `traffic_volume`
* **Features:** `temp`, `rain_1h`, `snow_1h`, `clouds_all`, `weather_main`, `hour_of_day`, `day_of_week`, `month`, `is_holiday`

## 4. Machine Learning
Three regression models were trained and evaluated:
* Ridge Regression
* Random Forest Regressor
* XGBoost Regressor

## 5. Model Evaluation
The models were evaluated strictly on a chronologically held-out test set (split at `2017-11-01 20:00:00` with an 80/20 train-test ratio).

*Held-out chronological test-set metrics:*
| Model | MAE | RMSE | R² |
|---|---|---|---|
| Ridge | 1573.26 | 1799.66 | 0.1634 |
| Random Forest | 309.40 | 547.75 | 0.9225 |
| XGBoost | 296.29 | 509.51 | 0.9329 |

## 6. Model Selection
XGBoost was explicitly selected as the final production model using the predefined criterion of achieving the lowest test RMSE (509.51).

## 7. MLOps
* **MLflow:** Used for experiment tracking during Phase 2 to track hyperparameters and evaluation metrics.
* **Model Artifact & Versioning:** The selected model is saved locally as an explicitly versioned `.joblib` artifact along with `metadata.json`.
* **FastAPI:** Serves the explicitly selected model for real-time inference without retraining.
* **React:** Provides a user-facing prediction dashboard.
* **GitHub Actions:** Automatically validates backend tests, model artifacts, and frontend builds on pushes and pull requests.

## 8. Architecture

```text
       Dataset
          ↓
    Preprocessing
          ↓
 Feature Engineering
          ↓
   Model Training
          ↓
        MLflow
          ↓
    Model Selection
          ↓
     model.joblib
          ↓
       FastAPI
          ↓
   React Dashboard
```

## 9. Running Locally

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 10. Testing
* 5/5 backend tests passed (Pytest).
* Frontend production build passed.
* GitHub Actions workflow created for continuous validation.

## 11. Docker
Docker/containerization is not included in the current implementation.
