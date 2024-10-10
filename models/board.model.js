import { model, Schema } from 'mongoose'

const boardSchema = new Schema(
  {
    title: { type: String, required: true },
    users: [{ type: Schema.ObjectId, ref: 'User' }],
    projects: [{ type: Schema.ObjectId, ref: 'Project' }],
  },
  { timestamps: true }
)

export default model('Board', boardSchema)
