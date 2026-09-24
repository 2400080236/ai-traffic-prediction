import os
import pandas as pd
import urllib.request
import gzip
import shutil

base_dir = r"d:\Documents\RAN1"
ml_data_dir = os.path.join(base_dir, "ml", "data")
scratch_dir = os.path.join(base_dir, "scratch")

os.makedirs(ml_data_dir, exist_ok=True)
os.makedirs(scratch_dir, exist_ok=True)

url = "https://archive.ics.uci.edu/ml/machine-learning-databases/00492/Metro_Interstate_Traffic_Volume.csv.gz"
gz_path = os.path.join(ml_data_dir, "Metro_Interstate_Traffic_Volume.csv.gz")
csv_path = os.path.join(ml_data_dir, "Metro_Interstate_Traffic_Volume.csv")

if not os.path.exists(csv_path):
    print("Downloading dataset...")
    urllib.request.urlretrieve(url, gz_path)
    print("Extracting dataset...")
    with gzip.open(gz_path, 'rb') as f_in:
        with open(csv_path, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
else:
    print("Dataset already downloaded.")

print("Loading dataset...")
df = pd.read_csv(csv_path)

print("\n--- Dataset Inspection ---")
print(f"Dimensions (Rows, Columns): {df.shape}")
print("\n--- Columns and Data Types ---")
print(df.dtypes)
print("\n--- Missing Values ---")
print(df.isnull().sum())
print("\n--- Target Distribution (traffic_volume) ---")
print(df['traffic_volume'].describe())
print("\n--- Time Range ---")
print(f"Start: {df['date_time'].min()}")
print(f"End: {df['date_time'].max()}")
