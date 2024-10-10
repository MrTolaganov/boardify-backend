import BaseError from '../errors/base.error.js'
import boardService from '../services/board.service.js'

export default async function (req, res, next) {
  try {
    const { board } = await boardService.getBoard(req.params.boardId)
    if (!board.users.includes(req.user.id))
      return next(BaseError.BadRequest('Only author can edit or delete this board'))
    next()
  } catch (error) {
    return next(BaseError.BadRequest(`Error with authorMiddleware: ${error} ${req.params.boardId}`))
  }
}
