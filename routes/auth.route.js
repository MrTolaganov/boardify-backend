import { Router } from 'express'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const authRouter = Router()

authRouter.post('/signup', authController.signup)
authRouter.post('/signin', authController.signin)
authRouter.delete('/signout', authMiddleware, authController.signout)
authRouter.get('/getuser/:userId', authMiddleware, authController.getUser)
authRouter.get('/getusers', authMiddleware, authController.getUsers)
authRouter.get('/refresh', authController.refresh)
authRouter.post('/forgot-pass', authController.forgotPass)
authRouter.post('/set-newpass', authController.setNewPass)

export default authRouter
