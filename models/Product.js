import mongoose from 'mongoose'
import shortid from 'shortid'

const productSchema = mongoose.Schema({
  name: {
    type: string,
    required: true
  },
  mediaUrl: {
    type: string,
    required: true
  },
  sku: {
    type: String,
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