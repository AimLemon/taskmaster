import User from '../models/UserModel.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email: email } });
    
    if (!user) return res.status(404).json({ msg: "Email tidak terdaftar" });
    
    if (password !== user.password) return res.status(400).json({ msg: "Password salah" });

    res.status(200).json({ 
      msg: "Login Berhasil", 
      user: { id: user.id, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};