import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../../models/User'
import connectDB from '../../utils/connectDb'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

connectDB()

async function Signup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send('name must be within 3-10 characters long.');
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).send('password must be atleast 6 characters long.');
    } else if (!isEmail(email)) {
      return res.status(422).send('email is not valid.');
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`Account with this Email ${email} already exist`);
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Signup user. Try Again Later...");
  }
}

export default Signup;