# Demonstration Guide
*Estimated time: 5-10 minutes*

## Step-by-Step Plan

1. **Explain Problem Statement**
   * Introduce the project: Predicting hourly traffic volume on I-94 to manage congestion.
   
2. **Show Dataset/Features**
   * Briefly discuss the Metro Interstate Traffic Volume dataset (48k records).
   * Explain the features: Weather (Temp, Rain, Snow, Clouds), Time (Hour, Day, Month), and Holidays.
   
3. **Explain Preprocessing**
   * Explain that data was chronologically split (80/20) to prevent data leakage.
   * Median temperature imputation was done using *only* the training set.
   
4. **Show Model Comparison**
   * Show the metrics for Ridge, Random Forest, and XGBoost.
   * Note how non-linear tree models significantly outperformed the linear baseline.
   
5. **Show MLflow Experiment Tracking**
   * Explain how MLflow was used locally to track parameters, model metrics, and artifacts during training.
   
6. **Explain Model Selection**
   * Explain the explicit selection of XGBoost due to its superior RMSE (509.51) and R² (~93.3%).
   * Show that it was saved explicitly as a versioned artifact (`model.joblib`) with `metadata.json`.
   
7. **Show FastAPI Swagger**
   * Open `http://127.0.0.1:8000/docs` in the browser.
   * Demonstrate the `/health`, `/model-info`, and `/predict` endpoints.
   * Emphasize that the API *only performs inference* and loads the exact XGBoost artifact ONCE at startup.
   
8. **Show React Dashboard**
   * Open the frontend at `http://localhost:5173`.
   * Show the main dashboard, health status, workflow visual, and Model Details page (dynamically fetching metadata).
   
9. **Enter Prediction Values**
   * Navigate to the Predict page.
   * Enter the test parameters:
     * Temperature: **288.5 K**
     * Rain 1h: **0 mm**
     * Snow 1h: **0 mm**
     * Cloud Coverage: **40 %**
     * Weather Main: **Clear**
     * Hour of Day: **8**
     * Day of Week: **Tuesday**
     * Month: **10**
     * Holiday: **No**
     
10. **Show Actual Prediction**
    * Click "Predict Traffic".
    * Show the resulting prediction card displaying **5,857.56 vehicles/hour** generated via XGBoost.
    * Mention that ~5.8k vehicles perfectly aligns with heavy morning rush-hour traffic.

11. **Explain CI/CD Tests**
    * Open `.github/workflows/ci.yml`.
    * Explain that pushing code runs backend Python validation, validates the model metadata against constraints (RMSE < 1000, R2 > 0.8), and performs a production frontend React build.
    
12. **Explain the Overall Architecture**
    * Use the `README.md` diagram to tie everything together.
    * Conclude the demo!
