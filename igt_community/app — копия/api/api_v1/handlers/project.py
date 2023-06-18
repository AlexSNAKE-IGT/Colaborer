from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends
from app.models.user_model import User
from app.api.deps.user_deps import get_current_user
from app.schemas.project_schema import ProjectOut, ProjectCreate, ProjectUpdate
from app.services.project_service import ProjectService
from app.models.project_model import Project

project_router = APIRouter()


@project_router.get('/', summary="Get all projects of the user", response_model=List[ProjectOut])
async def list(current_user: User = Depends(get_current_user)):
    return await ProjectService.list_projects(current_user)


@project_router.post('/create', summary="Create Project", response_model=Project)
async def create_project(data: ProjectCreate, current_user: User = Depends(get_current_user)):
    return await ProjectService.create_project(current_user, data)


@project_router.get('/{project_id}', summary="Get a project by project_id", response_model=ProjectOut)
async def retrieve(project_id: UUID, current_user: User = Depends(get_current_user)):
    return await ProjectService.retrieve_project(current_user, project_id)


@project_router.put('/{project_id}', summary="Update project by project_id", response_model=ProjectOut)
async def update(project_id: UUID, data: ProjectUpdate, current_user: User = Depends(get_current_user)):
    return await ProjectService.update_project(current_user, project_id, data)


@project_router.delete('/{project_id}', summary="Delete project by project_id")
async def delete(project_id: UUID, current_user: User = Depends(get_current_user)):
    await ProjectService.delete_project(current_user, project_id)
    return None
