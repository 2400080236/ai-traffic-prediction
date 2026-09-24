import os
import json
import joblib

def test_metadata_and_artifact_validation():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    model_path = os.path.join(base_dir, 'ml', 'artifacts', 'selected_model', 'model.joblib')
    metadata_path = os.path.join(base_dir, 'ml', 'artifacts', 'selected_model', 'metadata.json')

    # 1. Validate files exist
    assert os.path.exists(model_path), f"Model artifact not found at {model_path}"
    assert os.path.exists(metadata_path), f"Metadata not found at {metadata_path}"

    # 2. Validate artifact can be loaded
    try:
        model = joblib.load(model_path)
        assert model is not None
    except Exception as e:
        assert False, f"Failed to load model artifact: {e}"

    # 3. Validate metadata contents
    with open(metadata_path, 'r') as f:
        metadata = json.load(f)

    assert "model_name" in metadata
    assert "model_version" in metadata
    assert "features" in metadata
    assert "metrics" in metadata
    
    metrics = metadata["metrics"]
    assert "RMSE" in metrics
    assert "MAE" in metrics
    assert "R2" in metrics

    assert metrics["RMSE"] > 0
    assert metrics["MAE"] > 0

    # Optional ML Quality Gate
    # Thresholds: R2 > 0.80, RMSE < 1000
    assert metrics["R2"] > 0.80, f"R2 is below threshold: {metrics['R2']}"
    assert metrics["RMSE"] < 1000, f"RMSE is above threshold: {metrics['RMSE']}"
