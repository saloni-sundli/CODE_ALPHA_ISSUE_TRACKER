import {User} from "../db/models/user.model.js";

export const signup = async (req, res) => {
  console.log(req.body)
  const { username, email, password, role, color } = req.body;
  const emailCheck = await User.findOne({ email });
  if (emailCheck) {
    return res.json({ msg: "Email already in use", status: false });
  }
  const userNameCheck = await User.findOne({ username });
  if (userNameCheck) {
    return res.json({ msg: "Username already in use", status: false });
  }

  const newUser = new User({
    username,
    email,
    password,
    role,
    color,
  });

  await newUser.save();
  res.status(201).json({ status: true, newUser });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if(!user){
      return res.json({ msg: "incorrect username or password", status: false });
  }

  if(user.password != password){
      return res.json({ msg: "incorrect username or password", status: false });
  }

  return res.json({ status: true, user });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({users});
};