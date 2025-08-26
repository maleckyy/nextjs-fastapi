from fastapi import APIRouter, Depends, HTTPException
from dependency import db_dependency
import models
from .schemas import ProjectCreate,ProjectOutput
from auth.routes import get_current_user

router = APIRouter(
    prefix="/details/personal-projects",
    tags=["Profile personal projects"],
    dependencies=[Depends(get_current_user)]
)

def handleErrors(item, not_found_message, current_user):
    if not item:
        raise HTTPException(status_code=404, detail=not_found_message)

    if not item.user_id == current_user.id:
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.get('', response_model=list[ProjectOutput])
async def get_profile_personal_projects(db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    return db.query(models.ProfilePersonalProjects).filter(models.ProfilePersonalProjects.user_id == current_user.id).all()

@router.post('', response_model=ProjectOutput)
async def create_new_personal_project(newProjectData: ProjectCreate, db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    new_project = models.ProfilePersonalProjects(**newProjectData.model_dump(), user_id = current_user.id)

    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.put('/{project_id}', response_model=ProjectOutput)
async def update_personal_project(project_id: str, updatedProjectData: ProjectCreate, db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    project_to_edit = db.query(models.ProfilePersonalProjects).filter(
        models.ProfilePersonalProjects.user_id == current_user.id,
        models.ProfilePersonalProjects.id == project_id
    ).first()

    handleErrors(project_to_edit, "Project not found", current_user)

    for key,value in updatedProjectData.model_dump().items():
        setattr(project_to_edit, key, value)

    db.commit()
    db.refresh(project_to_edit)
    return project_to_edit

@router.delete('/{project_id}')
async def delete_personal_project(project_id: str, db: db_dependency, current_user: models.Users = Depends(get_current_user)):
    project_to_delete = db.query(models.ProfilePersonalProjects).filter(
        models.ProfilePersonalProjects.user_id == current_user.id,
        models.ProfilePersonalProjects.id == project_id
    ).first()

    handleErrors(project_to_delete, "Project not found", current_user)

    db.delete(project_to_delete)
    db.commit()
    return {"message": "Project deleted"}