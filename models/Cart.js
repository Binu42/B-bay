import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types;
const cartSchema = new mongoose.Schema({
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
  ]
})

export default mongoose.models.carts || mongoose.model('carts', cartSchema);