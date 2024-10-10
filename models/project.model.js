import { model, Schema } from 'mongoose'

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    level: { type: String, required: true },
    progress: { type: Number, default: 0 },
    board: { type: Schema.ObjectId, ref: 'Board' },
    tasks: [{ type: Schema.ObjectId, ref: 'Task' }],
  },
  { timestamps: true }
)

export default model('Project', projectSchema)
