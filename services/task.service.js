import TaskDto from '../dtos/task.dto.js'
import taskModel from '../models/task.model.js'
import projectService from './project.service.js'

class TaskService {
  async addTask(title, projectId) {
    const task = await taskModel.create({ title, project: projectId })
    await projectService.addTask(projectId, task._id)
    const taskDto = new TaskDto(task)
    return { task: taskDto }
  }
  async getTask(taskId) {
    const task = await taskModel.findById(taskId).populate('project')
    const taskDto = new TaskDto(task)
    return { task: taskDto }
  }
  async getTasks() {
    const tasks = await taskModel.find().populate('project')
    const taskDtos = tasks.map(task => new TaskDto(task))
    return { tasks: taskDtos }
  }
  async editTask(taskId, body) {
    const task = await taskModel.findByIdAndUpdate(taskId, { ...body }, { new: true })
    const allTasks = await taskModel.find({ project: task.project })
    const allTasksNum = allTasks.length
    const checkedTasksNum = allTasks.filter(task => task.checked).length
    const progress = Math.round((checkedTasksNum / allTasksNum) * 100)
    await projectService.editTask(task.project, progress)
    const taskDto = new TaskDto(task)
    return { task: taskDto }
  }
  async deleteTask(taskId) {
    const task = await taskModel.findByIdAndDelete(taskId)
    await projectService.deleteTask(task.project, task._id)
  }
  async deleteProject(projectId) {
    await taskModel.deleteMany({ project: projectId })
  }
}

export default new TaskService()
