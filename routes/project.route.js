import { Router } from 'express'
import projectController from '../controllers/project.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import authorMiddleware from '../middlewares/author.middleware.js'

const projectRouter = Router()

projectRouter.post('/create/:boardId', authMiddleware, projectController.addProject)
projectRouter.get('/getproject/:projectId', authMiddleware, projectController.getProject)
projectRouter.get('/getprojects', authMiddleware, projectController.getProjects)
projectRouter.put(
  '/update/:boardId/:projectId',
  authMiddleware,
  authorMiddleware,
  projectController.editProject
)
projectRouter.delete(
  '/delete/:boardId/:projectId',
  authMiddleware,
  authorMiddleware,
  projectController.deleteProject
)

export default projectRouter
