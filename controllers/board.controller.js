import boardService from '../services/board.service.js'

class BoardController {
  async addBoard(req, res, next) {
    try {
      const board = await boardService.addBoard(req.body.title, req.user.id)
      res.status(201).json(board)
    } catch (error) {
      next(error)
    }
  }
  async getBoard(req, res, next) {
    try {
      const board = await boardService.getBoard(req.params.boardId)
      res.status(200).json(board)
    } catch (error) {
      next(error)
    }
  }
  async getBoards(req, res, next) {
    try {
      const boards = await boardService.getBoards()
      res.status(200).json(boards)
    } catch (error) {
      next(error)
    }
  }
  async editBoard(req, res, next) {
    try {
      const board = await boardService.editBoard(req.params.boardId, req.body.title)
      res.status(200).json(board)
    } catch (error) {
      next(error)
    }
  }
  async deleteBoard(req, res, next) {
    try {
      await boardService.deleteBoard(req.params.boardId, req.user.id)
      res.status(200).json({ message: 'Board deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export default new BoardController()
