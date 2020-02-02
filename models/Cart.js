import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.objectId,
    ref: 'users'
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: mongoose.Schema.Types.objectId,
        ref: "cart"
      }
    }
  ]
})

export default mongoose.models.users || mongoose.model('carts', cartSchema);