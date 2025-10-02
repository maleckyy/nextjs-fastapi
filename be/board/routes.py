from fastapi import APIRouter, Depends, HTTPException
from board.schemas import Board, BoardColumnOutput, BoardCreate, BoardOutput, BoardTaskCreate, BoardTaskOutput, ChangeTaskPositionRequestBody, TaskUpdate
from dependency import db_dependency
import models
from fastapi import APIRouter, Depends
from auth.routes import get_current_user
from dependency import db_dependency
from sqlalchemy.orm import selectinload

router = APIRouter(
    prefix="/board",
    tags=["Board"],
    dependencies=[Depends(get_current_user)]
)

def create_default_columns(db: db_dependency, board_id: str):
    db.add(models.BoardsColumns(name="todo", board_id=board_id, position=0))
    db.add(models.BoardsColumns(name="in progress", board_id=board_id, position=1))
    db.add(models.BoardsColumns(name="done", board_id=board_id, position=2))
    db.commit()

def check_board_auth(db:db_dependency,board_id: str,column_id: str,current_user: models.Users = Depends(get_current_user)):
    board = db.query(models.Boards).filter(models.Boards.id == board_id).first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    
    if board.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this board")

    column = db.query(models.BoardsColumns).filter(models.BoardsColumns.id == column_id).first()
    if not column:
        raise HTTPException(status_code=404, detail="Column not found")   


@router.get("", response_model=list[BoardOutput])
async def get_user_boards(db: db_dependency, current_user: models.Users = Depends(get_current_user)) :
    return db.query(models.Boards).filter(models.Boards.user_id == current_user.id).all()


@router.post("", response_model=BoardOutput)
async def create_new_board(db: db_dependency, new_board: Board ,current_user: models.Users = Depends(get_current_user)):
    new_board_object = models.Boards(
        name = new_board.name,
        user_id = current_user.id,
    )
    db.add(new_board_object)
    db.commit()
    db.refresh(new_board_object)
    create_default_columns(db, new_board_object.id)

    return new_board_object


@router.get("/{board_id}")
async def get_board(db: db_dependency ,board_id: str, current_user: models.Users = Depends(get_current_user)):
    board = db.query(models.Boards).filter(
        models.Boards.user_id == current_user.id,
        models.Boards.id == board_id
        ).first()

    if not board:
        raise HTTPException(status_code=404, detail="Board not found")

    cols = (
        db.query(models.BoardsColumns)
        .options(selectinload(models.BoardsColumns.tasks))
        .filter(models.BoardsColumns.board_id == board_id)
        .order_by(models.BoardsColumns.position.asc())
        .all()
    )

    return {
        "board": board,
        "columns": cols
    }


@router.patch("/{board_id}")
async def change_board_name(db: db_dependency ,board_id: str, new_board_data: Board, current_user: models.Users = Depends(get_current_user)):

    board = db.query(models.Boards).filter(models.Boards.id == board_id).first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    if board.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this board")

    board.name = new_board_data.name
    db.commit()
    db.refresh(board)

    return new_board_data.name

# board delete
@router.delete("/{board_id}")
async def delete_board(db: db_dependency ,board_id: str,current_user: models.Users = Depends(get_current_user)):
    
    board = db.query(models.Boards).filter(models.Boards.id == board_id).first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    if board.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this board")
    
    db.delete(board)
    db.commit()
    return {"details": "Board deleted"}


# add new task
@router.post("/{board_id}/column/{column_id}")
async def create_new_task(db: db_dependency, board_id: str, column_id: str, task_data: BoardTaskCreate, current_user: models.Users = Depends(get_current_user)):

    board = db.query(models.Boards).filter(
        models.Boards.user_id == current_user.id,
        models.Boards.id == board_id
        ).first()

    if not board:
        raise HTTPException(404, detail="Board not found")
     
    column = db.query(models.BoardsColumns).filter(models.BoardsColumns.id == column_id).first()

    if not column:
        raise HTTPException(404, detail="Column not found")
    
    new_task = models.BoardTasks(
        column_id = column_id,
        title= task_data.title,
        position= task_data.position
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

# get task by id
@router.get("/{board_id}/task/{task_id}", response_model=BoardTaskOutput)
async def get_task_by_id(db: db_dependency,board_id: str, task_id: str, current_user: models.Users = Depends(get_current_user)):

    board = db.query(models.Boards).filter(
        models.Boards.user_id == current_user.id,
        models.Boards.id == board_id
        ).first()

    if not board:
        raise HTTPException(404, detail="Board not found")
    
    task = db.query(models.BoardTasks).filter(models.BoardTasks.id == task_id).first()

    if not task:
        raise HTTPException(404, detail="Task not found")
    return task


@router.post("/{board_id}/task/{task_id}")
async def change_task_position(
    db: db_dependency,
    task_id: str,
    board_id: str,
    task: ChangeTaskPositionRequestBody,
    current_user: models.Users = Depends(get_current_user)
):
    
    board = db.query(models.Boards).filter(
        models.Boards.user_id == current_user.id,
        models.Boards.id == board_id
        ).first()

    if not board:
        raise HTTPException(404, detail="Board not found")

    task_to_update = db.query(models.BoardTasks).filter(models.BoardTasks.id == task_id).first()
    if not task_to_update:
        return {"error": "Task not found"}

    if task.destination_column_id != task.source_column_id:
        task_to_update.column_id = task.destination_column_id

    tasks = (
        db.query(models.BoardTasks)
        .filter(models.BoardTasks.column_id == task.destination_column_id)
        .order_by(models.BoardTasks.position.asc())
        .all()
    )

    tasks = [t for t in tasks if str(t.id) != str(task_id)]
    insert_index = min(task.new_task_position, len(tasks))
    tasks.insert(insert_index, task_to_update)

    for index, t in enumerate(tasks):
        t.position = index

    db.commit()
    return {"response": "success"}


@router.delete("/{board_id}/column/{column_id}/task/{task_id}")
async def delete_task(
    db: db_dependency,
    board_id: str,
    column_id: str,
    task_id: str,
    current_user: models.Users = Depends(get_current_user)
):
    check_board_auth(db, board_id,column_id,current_user)
    
    task_to_delete = db.query(models.BoardTasks).filter(models.BoardTasks.id == task_id).first()

    if not task_to_delete.column_id != column_id:
        raise HTTPException(status_code=400, detail="Task does not belong to this board")   

    if not task_to_delete:
        raise HTTPException(404, "Task not found")
    
    db.delete(task_to_delete)
    db.commit()
    return {"detail": "Task deleted"}


@router.patch("/{board_id}/column/{column_id}/task/{task_id}")
async def update_task(
    db: db_dependency,
    board_id: str,
    column_id: str,
    task_id: str,
    updated_task: TaskUpdate,
    current_user: models.Users = Depends(get_current_user)
):
    check_board_auth(db, board_id,column_id,current_user)

    task_to_update = db.query(models.BoardTasks).filter(models.BoardTasks.id == task_id).first()

    if not task_to_update:
        raise HTTPException(status_code=400, detail="Task does not belong to this board")   

    task_to_update.title = updated_task.title
    task_to_update.description = updated_task.description
    task_to_update.priority = updated_task.priority

    db.commit()
    db.refresh(task_to_update)

    return task_to_update