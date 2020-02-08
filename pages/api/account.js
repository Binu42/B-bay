import connectDB from "../../utils/connectDb";
import User from '../../models/User'
import jwt from 'jsonwebtoken'

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      handleGetReq(req, res);
      break;
    case "PUT":
      handlePutReq(req, res);
      break;
    default:
      res.status(405).send(`method ${req.method} is not allowed`);
  }
}

const handleGetReq = async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }

  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userId });
    if (user) {
      return res.status(200).json(user);
    } else {
      res.status(404).send('No user found');
    }
  } catch (error) {
    res.status(403).send('Invalid Token');
  }
}


const handlePutReq = async (req, res) => {
  const { _id, role } = req.body;
  await User.findByIdAndUpdate({ _id }, { role });
  res.status(200).send('user permission updated');
}