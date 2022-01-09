from datetime import datetime
from typing import List

from pydantic import BaseModel


class TrainData(BaseModel):
    store_id: str
    product_name: str
    date: datetime
    quantity: float


class TrainDataRequest(BaseModel):
    data: List[TrainData]
