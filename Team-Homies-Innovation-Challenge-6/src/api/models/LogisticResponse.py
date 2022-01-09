from pydantic import BaseModel


class LogisticResponse(BaseModel):
    company: str
    price: float
