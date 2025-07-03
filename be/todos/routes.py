from fastapi import APIRouter, Depends, HTTPException, status
from uuid import UUID
from auth.routes import get_current_user
import models
from .schemas import TodoCreate, TodoResponse, TodoUpdate
from dependency import db_dependency



router = APIRouter(prefix="/todo", tags=["Todos"], dependencies=[Depends(get_current_user)])

@router.get('/all', response_model=list[TodoResponse])
async def get_all_user_todos(db:db_dependency, current_user: models.Users = Depends(get_current_user)):
    return db.query(models.TodoList).filter(models.TodoList.user_id == current_user.id).all()

@router.get('', response_model=list[TodoResponse])
async def get_three_user_todos(db:db_dependency, current_user: models.Users = Depends(get_current_user)):
    return db.query(models.TodoList).filter(models.TodoList.user_id == current_user.id).limit(3).all()

@router.post('', response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(todo: TodoCreate, db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    new_todo = models.TodoList(
        title=todo.title,
        description=todo.description,
        user_id=current_user.id
    )

    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

@router.delete('/{todo_id}')
async def delete_todo_by_id(todo_id: UUID, db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    todo_to_delete = db.query(models.TodoList).filter(models.TodoList.id == todo_id).first()

    if not todo_to_delete:
        raise HTTPException(status_code=404, detail="Todo not found")

    if not todo_to_delete.user_id == current_user.id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    db.delete(todo_to_delete)
    db.commit()
    return f'Usunięto poprawnie todosa'



@router.put('/{todo_id}')
async def update_todo_by_id(todo_id: UUID, todo:TodoUpdate, db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    todo_to_update = db.query(models.TodoList).filter(models.TodoList.id == todo_id).first()

    if not todo_to_update:
        raise HTTPException(status_code=404, detail="Todo not found")

    if not todo_to_update.user_id == current_user.id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    for key,value in todo.model_dump().items():
        setattr(todo_to_update, key, value)
    
    db.commit()
    db.refresh(todo_to_update)
    return todo_to_update