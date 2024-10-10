import { Schema, model } from 'mongoose'

const tokenSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
})

export default model('Token', tokenSchema)
