import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../../models/User'
import connectDB from '../../utils/connectDb'

connectDB();

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).send('No user Exist with this Email');
    }
    const PasswordMatch = await bcrypt.compare(password, user.password);
    if (PasswordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(200).json(token);
    } else {
      res.status(401).send('password do not matched');
    }
  } catch (error) {
    console.error(error);
    res.send(500).send('Error loggin in user');
  }
}

export default Login;