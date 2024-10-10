import { Router } from 'express'
import boardController from '../controllers/board.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import authorMiddleware from '../middlewares/author.middleware.js'

const boardRouter = Router()

boardRouter.post('/create', authMiddleware, boardController.addBoard)
boardRouter.get('/getboard/:boardId', authMiddleware, boardController.getBoard)
boardRouter.get('/getboards', authMiddleware, boardController.getBoards)
boardRouter.put('/update/:boardId', authMiddleware, authorMiddleware, boardController.editBoard)
boardRouter.delete(
  '/delete/:boardId',
  authMiddleware,
  authorMiddleware,
  boardController.deleteBoard
)

export default boardRouter
