import BoardDto from '../dtos/board.dto.js'
import boardModel from '../models/board.model.js'
import authService from './auth.service.js'
import projectService from './project.service.js'

class BoardService {
  async addBoard(title, author) {
    const newBoard = await boardModel.create({ title, users: [author] })
    await authService.addBoard(author, newBoard._id)
    const boardDto = new BoardDto(newBoard)
    return { board: boardDto }
  }
  async getBoard(boardId) {
    const board = await boardModel.findById(boardId).populate('projects')
    const boardDto = new BoardDto(board)
    return { board: boardDto }
  }
  async getBoards() {
    const boards = await boardModel.find().populate('users projects')
    const boardDtos = boards.map(board => new BoardDto(board))
    return { boards: boardDtos }
  }
  async editBoard(boardId, title) {
    const board = await boardModel.findByIdAndUpdate(boardId, { title }, { new: true })
    const boardDto = new BoardDto(board)
    return { board: boardDto }
  }
  async deleteBoard(boardId, author) {
    await boardModel.findByIdAndDelete(boardId)
    await authService.deleteBoard(author, boardId)
    await projectService.deleteBoard(boardId)
  }
  async addProject(boardId, projectId) {
    await boardModel.findByIdAndUpdate(boardId, { $push: { projects: projectId } })
  }
  async deleteProject(boardId, projectId) {
    await boardModel.findByIdAndUpdate(boardId, { $pull: { projects: projectId } })
  }
}

export default new BoardService()
