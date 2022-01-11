from datetime import datetime

from pydantic import BaseModel


class LogisticPredictionRequest(BaseModel):
    distance: float
    city: str
    weight: float
    date: datetime
