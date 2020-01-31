import Product from '../../models/Product'

// export default async (req, res) => {
//   const { _id } = req.query;
//   const product = await Product.findOne({ _id });
//   res.status(200).send(product);
// }


export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case 'DELETE':
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`method ${req.method} not allowed`);
  }
}

const handleGetRequest = async (req, res) => {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).send(product);
}

const handleDeleteRequest = async (req, res) => {
  const { _id } = req.query;
  await Product.findOneAndDelete({ _id });
  res.status(204).json({});
}