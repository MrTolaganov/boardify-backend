import { model, Schema } from 'mongoose'

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    checked: { type: Boolean, default: false },
    project: { type: Schema.ObjectId, ref: 'Project' },
  },
  { timestamps: true }
)

export default model('Task', taskSchema)
