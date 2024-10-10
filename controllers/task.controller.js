import taskService from '../services/task.service.js'

class TaskController {
  async addTask(req, res, next) {
    try {
      const task = await taskService.addTask(req.body.title, req.params.projectId)
      res.status(201).json(task)
    } catch (error) {
      next(error)
    }
  }
  async getTask(req, res, next) {
    try {
      const task = await taskService.getTask(req.params.taskId)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
  async getTasks(req, res, next) {
    try {
      const tasks = await taskService.getTasks()
      res.status(200).json(tasks)
    } catch (error) {
      next(error)
    }
  }
  async editTask(req, res, next) {
    try {
      const task = await taskService.editTask(req.params.taskId, req.body)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
  async deleteTask(req, res, next) {
    try {
      await taskService.deleteTask(req.params.taskId)
      res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export default new TaskController()
