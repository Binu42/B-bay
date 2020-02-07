import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types;
const orderSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'users'
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: ObjectId,
        ref: "products"
      }
    }
  ],
  email: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, { timestamps: true })

export default mongoose.models.orders || mongoose.model('orders', orderSchema);