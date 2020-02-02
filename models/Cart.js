import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.objectId.types(),
    ref: 'users'
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: mongoose.Schema.objectId,
        ref: "cart"
      }
    }
  ]
})

export default mongoose.models.users || mongoose.model('carts', cartSchema);