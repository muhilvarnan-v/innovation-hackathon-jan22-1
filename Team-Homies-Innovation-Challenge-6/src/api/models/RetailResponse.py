from typing import Dict, Optional, List

from pydantic import BaseModel


class Prediction(BaseModel):
    store_id: str
    product_name: str
    prediction: str
    error: Optional[str]


class RetailResponse(BaseModel):
    __root__: List[Dict[str, Prediction]]
