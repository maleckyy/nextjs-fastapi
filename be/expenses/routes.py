from fastapi import APIRouter, Depends, HTTPException, status
from auth.routes import get_current_user
from enums.expense_enum import ExpenseType
from .schemas import ExpenseCreate, ExpenseOut, ExpenseSummary, ExpenseUpdate
from dependency import db_dependency
from sqlalchemy import desc, extract, func
from datetime import datetime
import models

router = APIRouter(prefix="/expenses", tags=["Expenses"], dependencies=[Depends(get_current_user)])


@router.get('', response_model=list[ExpenseOut])
async def get_expenses(db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    return db.query(models.Expense).filter(models.Expense.user_id == current_user.id).order_by(desc(models.Expense.expense_date)).all()


@router.post('', status_code=status.HTTP_201_CREATED)
async def add_new_expense(db: db_dependency, new_expense_data: ExpenseCreate, current_user: models.Users = Depends(get_current_user)):
    new_expense = models.Expense(**new_expense_data.dict(), user_id = current_user.id)
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense


@router.put('/{expense_id}')
async def update_expense(expense_id: str, db: db_dependency, expense_data: ExpenseUpdate, current_user: models.Users = Depends(get_current_user)):
    expense_to_update = db.query(models.Expense).filter(models.Expense.id == expense_id).first()

    if not expense_to_update:
        raise HTTPException(status_code=404, detail="Expense not found")

    if not expense_to_update.user_id == current_user.id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    for key,value in expense_data.model_dump().items():
        setattr(expense_to_update, key, value)
        
    db.commit()
    db.refresh(expense_to_update)
    return expense_to_update


@router.delete('/{expense_id}')
async def delete_expense(expense_id: str, db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    expense_to_delete = db.query(models.Expense).filter(models.Expense.id == expense_id).first()

    if not expense_to_delete:
        raise HTTPException(status_code=404, detail="Expense not found")

    if not expense_to_delete.user_id == current_user.id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    db.delete(expense_to_delete)
    db.commit()
    return 'Usunięto expense'


@router.get("/monthly", response_model=ExpenseSummary)
async def get_monthly_summary( db: db_dependency, current_user: models.Users = Depends(get_current_user) ):
    now = datetime.now()
    year = now.year
    month = now.month

    total_expense = db.query(func.coalesce(func.sum(models.Expense.amount), 0))\
        .filter(
            models.Expense.user_id == current_user.id,
            models.Expense.expense_type == ExpenseType.WYDATEK,
            extract('year', models.Expense.expense_date) == year,
            extract('month', models.Expense.expense_date) == month
        ).scalar()

    total_income = db.query(func.coalesce(func.sum(models.Expense.amount), 0))\
        .filter(
            models.Expense.user_id == current_user.id,
            models.Expense.expense_type == ExpenseType.PRZYCHOD,
            extract('year', models.Expense.expense_date) == year,
            extract('month', models.Expense.expense_date) == month
        ).scalar()

    balance = total_income - total_expense

    return {
        "total_income": float(total_income),
        "total_expense": float(total_expense),
        "balance": float(balance),
        "month": f"{month:02}",
        "year": str(year)
    }