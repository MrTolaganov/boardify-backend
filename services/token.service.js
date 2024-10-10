import jwt from 'jsonwebtoken'
import tokenModel from '../models/token.model.js'

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' })
    return { accessToken, refreshToken }
  }
  async saveRefreshToken(userId, refreshToken) {
    const existedToken = await tokenModel.findOne({ user: userId })
    if (existedToken) {
      await tokenModel.findByIdAndUpdate(existedToken._id, { refreshToken })
    } else {
      await tokenModel.create({ user: userId, refreshToken })
    }
  }
  async removeRefreshToken(refreshToken) {
    await tokenModel.findOneAndDelete({ refreshToken })
  }
  async findRefreshToken(refreshToken) {
    const token = await tokenModel.findOne({ refreshToken })
    return token
  }
  validateAccessToken(accessToken){
    try {
      const userPayload = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)
      return userPayload
    } catch {
      return null
    }
  }
  validateRefreshToken(refreshToken) {
    try {
      const userPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY)
      return userPayload
    } catch {
      return null
    }
  }
}

export default new TokenService()
