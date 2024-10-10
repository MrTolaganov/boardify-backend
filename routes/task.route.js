import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import taskController from '../controllers/task.controller.js'
import authorMiddleware from '../middlewares/author.middleware.js'

const taskRouter = Router()

taskRouter.post('/create/:projectId', authMiddleware, taskController.addTask)
taskRouter.get('/gettask/:taskId', authMiddleware, taskController.getTask)
taskRouter.get('/gettasks', authMiddleware, taskController.getTasks)
taskRouter.put(
  '/update/:boardId/:taskId',
  authMiddleware,
  authorMiddleware,
  taskController.editTask
)
taskRouter.delete(
  '/delete/:boardId/:taskId',
  authMiddleware,
  authorMiddleware,
  taskController.deleteTask
)

export default taskRouter
