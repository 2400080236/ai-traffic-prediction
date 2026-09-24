import os
import json
import pandas as pd
import numpy as np
import mlflow
import mlflow.sklearn
import xgboost as xgb
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib

# Paths
BASE_DIR = r"d:\Documents\RAN1"
import os
os.chdir(BASE_DIR)
DATA_PATH = os.path.join(BASE_DIR, "ml", "data", "Metro_Interstate_Traffic_Volume.csv")
MLFLOW_TRACKING_URI = "sqlite:///" + os.path.join(BASE_DIR, "ml", "mlruns.db")
ARTIFACT_DIR = os.path.join(BASE_DIR, "ml", "artifacts", "selected_model")
os.makedirs(ARTIFACT_DIR, exist_ok=True)

# 1. Load Data
df = pd.read_csv(DATA_PATH)
df['date_time'] = pd.to_datetime(df['date_time'])
df = df.sort_values('date_time').reset_index(drop=True)

# 2. Extract Temporal Features BEFORE split to easily slice
df['hour_of_day'] = df['date_time'].dt.hour
df['day_of_week'] = df['date_time'].dt.dayofweek
df['month'] = df['date_time'].dt.month

# 3. Handle holiday
# Fill NaNs with "None", which represents regular days
df['holiday'] = df['holiday'].fillna("None")
df['is_holiday'] = (df['holiday'] != "None").astype(int)

# 4. Chronological Split
split_idx = int(len(df) * 0.8)
train_df = df.iloc[:split_idx].copy()
test_df = df.iloc[split_idx:].copy()

split_date = test_df['date_time'].iloc[0]

# Print stats for prompt
print(f"Exact train size: {len(train_df)}")
print(f"Exact test size: {len(test_df)}")
print(f"Exact chronological split date: {split_date}")

# 5. Handle temp == 0 (median of train)
median_temp = train_df.loc[train_df['temp'] > 0, 'temp'].median()
train_df.loc[train_df['temp'] == 0, 'temp'] = median_temp
test_df.loc[test_df['temp'] == 0, 'temp'] = median_temp

# Drop unused
drop_cols = ['holiday', 'weather_description', 'date_time', 'traffic_volume']
X_train = train_df.drop(columns=drop_cols)
y_train = train_df['traffic_volume']
X_test = test_df.drop(columns=drop_cols)
y_test = test_df['traffic_volume']

# Column categorization for preprocessing
num_cols_to_scale = ['temp', 'rain_1h', 'snow_1h', 'clouds_all']
cat_cols = ['weather_main']
passthrough_cols = ['hour_of_day', 'day_of_week', 'month', 'is_holiday']

print(f"Features used: {list(X_train.columns)}")

mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
experiment_name = "Traffic_Prediction_v2"
artifact_location = f"file:///{BASE_DIR}/ml/mlruns"
try:
    mlflow.create_experiment(experiment_name, artifact_location=artifact_location.replace('\\', '/'))
except Exception:
    pass
mlflow.set_experiment(experiment_name)

models = {
    "Ridge": Ridge(random_state=42),
    "RandomForest": RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1),
    "XGBoost": xgb.XGBRegressor(n_estimators=100, random_state=42, n_jobs=-1)
}

results = []
best_model_name = None
best_model_pipeline = None
best_rmse = float('inf')
best_metrics = {}

for name, model in models.items():
    print(f"\nTraining {name}...")
    with mlflow.start_run(run_name=name):
        # Create preprocessor for this model
        if name == "Ridge":
            # Scale num cols
            preprocessor = ColumnTransformer(transformers=[
                ('num', StandardScaler(), num_cols_to_scale),
                ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols),
                ('pass', 'passthrough', passthrough_cols)
            ])
        else:
            # Tree models - no scaling required for num cols
            preprocessor = ColumnTransformer(transformers=[
                ('num', 'passthrough', num_cols_to_scale),
                ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols),
                ('pass', 'passthrough', passthrough_cols)
            ])
            
        pipeline = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('model', model)
        ])
        
        # Fit and predict
        pipeline.fit(X_train, y_train)
        preds = pipeline.predict(X_test)
        
        # Metrics
        mae = mean_absolute_error(y_test, preds)
        rmse = np.sqrt(mean_squared_error(y_test, preds))
        r2 = r2_score(y_test, preds)
        
        # Log to MLflow
        mlflow.log_param("model_type", name)
        mlflow.log_param("train_size", len(X_train))
        mlflow.log_param("test_size", len(X_test))
        if name in ["RandomForest", "XGBoost"]:
            mlflow.log_param("n_estimators", 100)
            
        mlflow.log_metric("MAE", mae)
        mlflow.log_metric("RMSE", rmse)
        mlflow.log_metric("R2", r2)
        mlflow.sklearn.log_model(pipeline, "model", serialization_format="cloudpickle")
        
        results.append({
            "Model": name,
            "MAE": mae,
            "RMSE": rmse,
            "R2": r2
        })
        
        if rmse < best_rmse:
            best_rmse = rmse
            best_model_name = name
            best_model_pipeline = pipeline
            best_metrics = {"MAE": mae, "RMSE": rmse, "R2": r2}

print("\n--- Evaluation Results ---")
print(pd.DataFrame(results))
print(f"\nSelected Model: {best_model_name} (Lowest RMSE: {best_rmse})")

# Save explicitly selected artifact
model_path = os.path.join(ARTIFACT_DIR, "model.joblib")
joblib.dump(best_model_pipeline, model_path)

# Save metadata
metadata = {
    "model_name": best_model_name,
    "model_version": "1.0",
    "training_date": datetime.now().isoformat(),
    "features": list(X_train.columns),
    "metrics": best_metrics,
    "dataset_info": {
        "train_size": len(train_df),
        "test_size": len(test_df),
        "split_date": str(split_date)
    }
}
with open(os.path.join(ARTIFACT_DIR, "metadata.json"), "w") as f:
    json.dump(metadata, f, indent=4)
    
print(f"\nArtifact saved to: {ARTIFACT_DIR}")
print("MLflow tracking stored in: ml/mlruns.db")
