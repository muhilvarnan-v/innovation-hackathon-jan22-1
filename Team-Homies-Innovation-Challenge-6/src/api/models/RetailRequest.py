import datetime
from typing import List

from pydantic import BaseModel


class RetailRequest(BaseModel):
    store_id: str
    products: List[str]
    date: datetime.datetime
