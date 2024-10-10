import ProjectDto from '../dtos/project.dto.js'
import projectModel from '../models/project.model.js'
import boardService from './board.service.js'
import taskService from './task.service.js'

class ProjectService {
  async addProject(projectData, boardId) {
    const { title, description, body, level } = projectData
    const project = await projectModel.create({ title, description, body, level, board: [boardId] })
    await boardService.addProject(boardId, project._id)
    const projectDto = new ProjectDto(project)
    return { project: projectDto }
  }
  async getProject(projectId) {
    const project = await projectModel.findById(projectId).populate('board tasks')
    const projectDto = new ProjectDto(project)
    return { project: projectDto }
  }
  async getProjects() {
    const projects = await projectModel.find().populate('board tasks')
    const projectDtos = projects.map(project => new ProjectDto(project))
    return { projects: projectDtos }
  }
  async editProject(projectId, projectData) {
    const project = await projectModel.findByIdAndUpdate(
      projectId,
      { ...projectData },
      { new: true }
    )
    const projectDto = new ProjectDto(project)
    return { project: projectDto }
  }
  async deleteProject(projectId, boardId) {
    await projectModel.findByIdAndDelete(projectId)
    await boardService.deleteProject(boardId, projectId)
    await taskService.deleteProject(projectId)
  }
  async addTask(projectId, taskId) {
    await projectModel.findByIdAndUpdate(projectId, { $push: { tasks: taskId } })
  }
  async editTask(projectId, progress) {
    await projectModel.findByIdAndUpdate(projectId, { progress })
  }
  async deleteTask(projectId, taskId) {
    await projectModel.findByIdAndUpdate(projectId, { $pull: { tasks: taskId } })
  }
  async deleteBoard(boardId) {
    const project = await projectModel.findOne({ board: boardId })
    await projectModel.deleteMany({ board: boardId })
    await taskService.deleteProject(project._id)
  }
}

export default new ProjectService()
