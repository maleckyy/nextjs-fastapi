from fastapi import APIRouter, Depends, HTTPException, status
from uuid import UUID
from auth.routes import get_current_user
import models
from .schemas import EventCreate, EventResponse, EventOutput
from dependency import db_dependency


router = APIRouter(prefix="/event", tags=["Eventss"], dependencies=[Depends(get_current_user)])

@router.get('', response_model=list[EventResponse])
async def get_events(db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    return db.query(models.Events).filter(models.Events.user_id == current_user.id).order_by(models.Events.event_date.asc()).all()

@router.post('', response_model=EventResponse)
async def create_event( event: EventCreate, db:db_dependency, current_user: models.Users = Depends(get_current_user)):
    new_event = models.Events(**event.dict(), user_id=current_user.id)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@router.get('/upcoming', response_model=list[EventResponse])
async def get_three_upcoming_events(db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    return db.query(models.Events).filter(models.Events.user_id == current_user.id).order_by(models.Events.event_date.asc()).limit(3).all()

@router.delete('/{event_id}')
async def delete_event( event_id: str, db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    event_to_delete = db.query(models.Events).filter(models.Events.id == event_id).first()

    if not event_to_delete:
        raise HTTPException(status_code=404, detail="Todo not found")

    if not event_to_delete.user_id == current_user.id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    db.delete(event_to_delete)
    db.commit()
    return {"details": "Usunięto event"}