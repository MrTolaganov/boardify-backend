import authService from '../services/auth.service.js'

class AuthController {
  async signup(req, res, next) {
    try {
      const user = await authService.signup(req.body)
      res.cookie('refreshToken', user.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
      })
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
  async signin(req, res, next) {
    try {
      const user = await authService.signin(req.body)
      res.cookie('refreshToken', user.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
      })
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
  async signout(req, res, next) {
    try {
      await authService.signout(req.cookies.refreshToken)
      res.clearCookie('refreshToken')
      res.status(200).json({ message: 'User signed out successfully' })
    } catch (error) {
      next(error)
    }
  }
  async getUser(req, res, next) {
    try {
      const user = await authService.getUser(req.params.userId)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await authService.getUsers()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }
  async refresh(req, res, next) {
    try {
      const user = await authService.refresh(req.cookies.refreshToken)
      res.cookie('refreshToken', user.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
      })
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
  async forgotPass(req, res, next) {
    try {
      const confirmationCode = await authService.forgotPass(req.body.email)
      res.cookie('confirmationCode', confirmationCode, {
        maxAge: 1000 * 60 * 15,
        httpOnly: true,
        secure: true,
      })
      res.status(200).json({ message: `Confirmatiion code has just send to ${req.body.email}` })
    } catch (error) {
      next(error)
    }
  }
  async setNewPass(req, res, next) {
    try {
      await authService.setNewPass(req.body.token, req.body.pass)
      res.status(200).json({ message: 'Password updated successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
