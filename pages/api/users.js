import jwt from 'jsonwebtoken'
import User from '../../models/User'
import Cors from 'micro-cors'

const cors = Cors({
  allowMethods: ['GET', 'HEAD'],
})

async function user(req, res) {
  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const users = await User.find({ _id: { $ne: userId } })
      .sort({ 'role': "asc" })
    res.status(200).json(users)
  } catch (error) {
    console.error(error);
    res.status(403).send('please Login Again');
  }
}

export default cors(user);