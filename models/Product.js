import mongoose from 'mongoose'
import shortid from 'shortid'

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
    default: shortid.generate()
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    require: true
  }
})

export default mongoose.models.products || mongoose.model('products', productSchema);