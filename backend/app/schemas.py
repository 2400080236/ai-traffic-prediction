from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    temp: float = Field(..., description="Temperature in Kelvin")
    rain_1h: float = Field(..., description="Rain in 1 hour (mm)")
    snow_1h: float = Field(..., description="Snow in 1 hour (mm)")
    clouds_all: int = Field(..., description="Percentage of cloud cover")
    weather_main: str = Field(..., min_length=1, description="Short text description of the current weather")
    hour_of_day: int = Field(..., ge=0, le=23, description="Hour of the day (0-23)")
    day_of_week: int = Field(..., ge=0, le=6, description="Day of the week (0-6)")
    month: int = Field(..., ge=1, le=12, description="Month of the year (1-12)")
    is_holiday: int = Field(..., ge=0, le=1, description="1 if it's a holiday, else 0")
