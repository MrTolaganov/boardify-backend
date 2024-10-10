import projectService from '../services/project.service.js'

class ProjectController {
  async addProject(req, res, next) {
    try {
      const project = await projectService.addProject(req.body, req.params.boardId)
      res.status(201).json(project)
    } catch (error) {
      next(error)
    }
  }
  async getProject(req, res, next) {
    try {
      const project = await projectService.getProject(req.params.projectId)
      res.status(200).json(project)
    } catch (error) {
      next(error)
    }
  }
  async getProjects(req, res, next) {
    try {
      const project = await projectService.getProjects()
      res.status(200).json(project)
    } catch (error) {
      next(error)
    }
  }
  async editProject(req, res, next) {
    try {
      const project = await projectService.editProject(req.params.projectId, req.body)
      res.status(200).json(project)
    } catch (error) {
      next(error)
    }
  }
  async deleteProject(req, res, next) {
    try {
      await projectService.deleteProject(req.params.projectId, req.params.boardId)
      res.status(200).json({ message: 'Project deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export default new ProjectController()
