import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

export default mongoose.models.products || mongoose.model('products', productSchema);