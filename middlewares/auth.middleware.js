import BaseError from '../errors/base.error.js'
import tokenService from '../services/token.service.js'

export default function (req, res, next) {
  try {
    const authHead = req.headers.authorization
    if (!authHead) return next(BaseError.UnauthorizedError())
    const accessToken = authHead.split(' ').at(1)
    const userPayload = tokenService.validateAccessToken(accessToken)
    if (!userPayload) return next(BaseError.UnauthorizedError())
    req.user = userPayload
    next()
  } catch (error) {
    return next(BaseError.UnauthorizedError())
  }
}
