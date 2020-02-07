import Products from '../../models/Product';
import connectDB from '../../utils/connectDb'

connectDB();

export default async (req, res) => {
  const { page, pageSize } = req.query;
  // console.log(page, pageSize);
  const pageNum = Number(page);
  const size = Number(pageSize);
  let products;
  const totalDocs = await Products.countDocuments();
  const totalPages = Math.ceil(totalDocs / size);
  if (pageNum === 1) {
    products = await Products.find().limit(size);
  } else {
    const skips = size * (pageNum - 1);
    products = await Products.find().skip(skips).limit(size);
  }
  // const products = await Products.find();
  res.status(200).json({ products, totalPages })
}