import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
MODEL_PATH = os.path.join(BASE_DIR, 'ml', 'artifacts', 'selected_model', 'model.joblib')
METADATA_PATH = os.path.join(BASE_DIR, 'ml', 'artifacts', 'selected_model', 'metadata.json')
