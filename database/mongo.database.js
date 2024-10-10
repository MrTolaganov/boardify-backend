import { connect } from 'mongoose'
import BaseError from '../errors/base.error.js'

export default async function connectDatabase() {
  try {
    await connect(process.env.MONGODB_URI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    throw BaseError.BadRequest(`MongoDB connection error: ${error}`)
  }
}
