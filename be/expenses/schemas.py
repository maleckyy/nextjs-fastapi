from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from enum import Enum
from decimal import Decimal
from enums.expense_enum import ExpenseType


class ExpenseBase(BaseModel):
    title: str
    description: str | None = None
    expense_date: datetime
    expense_type: ExpenseType
    amount: Decimal

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(ExpenseBase):
    pass

class ExpenseOut(ExpenseBase):
    id: UUID

    class Config:
        from_attributes = True

class ExpenseSummary(BaseModel):
    total_income: float
    total_expense: float
    balance: float
    month: str
    year: str  