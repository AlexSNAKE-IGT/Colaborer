from typing import List
from uuid import UUID
from app.models.user_model import User
from app.models.project_model import Project
from app.schemas.project_schema import ProjectCreate, ProjectUpdate


class ProjectService:
    @staticmethod
    async def list_projects(user: User) -> List[Project]:
        projects = await Project.find(Project.owner.id == user.id).to_list()
        return projects

    @staticmethod
    async def create_project(user: User, data: ProjectCreate) -> Project:
        project = Project(**data.dict(), owner=user)
        return await project.insert()

    @staticmethod
    async def retrieve_project(current_user: User, project_id: UUID):
        project = await Project.find_one(Project.project_id == project_id, Project.owner.id == current_user.id)
        return project

    @staticmethod
    async def update_project(current_user: User, project_id: UUID, data: ProjectUpdate):
        project = await ProjectService.retrieve_project(current_user, project_id)
        await project.update({"$set": data.dict(exclude_unset=True)})

        await project.save()
        return project

    @staticmethod
    async def delete_project(current_user: User, project_id: UUID) -> None:
        project = await ProjectService.retrieve_project(current_user, project_id)
        if project:
            await project.delete()

        return None