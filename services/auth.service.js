import UserDto from '../dtos/user.dto.js'
import BaseError from '../errors/base.error.js'
import userModel from '../models/user.model.js'
import mailService from './mail.service.js'
import tokenService from './token.service.js'
import bcrypt from 'bcrypt'

class AuthService {
  async signup(body) {
    const existedUser = await userModel.findOne({ email: body.email })
    if (existedUser) throw BaseError.BadRequest('User has already signed up')
    const hashedPass = await bcrypt.hash(body.pass, 10)
    const newUser = await userModel.create({ ...body, pass: hashedPass })
    const userDto = new UserDto(newUser)
    const { accessToken, refreshToken } = tokenService.generateTokens({ ...userDto })
    await tokenService.saveRefreshToken(userDto.id, refreshToken)
    return { user: userDto, accessToken, refreshToken }
  }
  async signin(body) {
    const existedUser = await userModel.findOne({ email: body.email })
    if (!existedUser) throw BaseError.BadRequest('User has not signed up yet')
    const correctPass = await bcrypt.compare(body.pass, existedUser.pass)
    if (!correctPass) throw BaseError.BadRequest('Incorrect password')
    const userDto = new UserDto(existedUser)
    const { accessToken, refreshToken } = tokenService.generateTokens({ ...userDto })
    await tokenService.saveRefreshToken(userDto.id, refreshToken)
    return { user: userDto, accessToken, refreshToken }
  }
  async signout(refreshToken) {
    await tokenService.removeRefreshToken(refreshToken)
  }
  async getUser(userId) {
    const user = await userModel.findById(userId).populate('boards')
    const userDto = new UserDto(user)
    return { user: userDto }
  }
  async getUsers() {
    const users = await userModel.find()
    const userDtos = users.map(user => new UserDto(user))
    return { users: userDtos }
  }
  async refresh(refreshToken) {
    const userPayload = tokenService.validateRefreshToken(refreshToken)
    const foundedRefreshToken = await tokenService.findRefreshToken(refreshToken)
    if (!userPayload || !foundedRefreshToken) throw BaseError.UnauthorizedError()
    const user = await userModel.findById(userPayload.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken)
    return { user: userDto, ...tokens }
  }
  async forgotPass(email) {
    const existedUser = await userModel.findOne({ email })
    if (!existedUser) throw BaseError.BadRequest('User has not signed up with this email')
    const confirmationCode = Math.round(Math.random() * 1000000)
    await mailService.sendForgotPass(existedUser.email, confirmationCode)
    return confirmationCode
  }
  async setNewPass(accessToken, pass) {
    const userPayload = tokenService.validateAccessToken(accessToken)
    if (!userPayload) throw BaseError.UnauthorizedError()
    const hashedPass = await bcrypt.hash(pass, 10)
    await userModel.findByIdAndUpdate(userPayload.id, { pass: hashedPass })
  }
  async addBoard(userId, boardId) {
    await userModel.findByIdAndUpdate(userId, { $push: { boards: boardId } })
  }
  async deleteBoard(userId, boardId) {
    await userModel.findByIdAndUpdate(userId, { $pull: { boards: boardId } })
  }
}

export default new AuthService()
