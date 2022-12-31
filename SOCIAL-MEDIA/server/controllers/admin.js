import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"
import bcrypt from "bcrypt"
import User from "../models/User.js";


export const adminRegister = async (req, res) => {
    try {
        const {
            
            email,
            password,
        
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newAdmin = new Admin({
           
            email,
            password: passwordHash,
          
        })
        const savedAdmin = await newAdmin.save()
        res.status(201).json(savedAdmin)

    } catch (err) {
        res.status(500).json({error: err.message})

    }

}



export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email: email })

        if (!admin) return res.status(400).json({ msg: " Admin does not exist" })

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

        const token = jwt.sign({ id: admin._id }, process.env.JWt_SECRET)

        delete admin.password;

        res.status(200).json({message: 'login success', success: true, token, admin })
    } catch (error) {
        res.status(500).json({ error: err.message, message: "error Logging", success: false })
    }
}

export const getFullUsers = async (req, res) => {
 
 try {
    let users = await User.find()
  
   
    const formattedFriends = users.map(
        ({ _id, firstName, lastName, location, picturePath }) => {
            return { _id, firstName, lastName, location, picturePath };
        }
    );
    res.status(200).json({message: 'Users', success: true, formattedFriends })
 } catch (error) {
    res.status(500).json({ error: error.message, message: "error while fetching users", success: false })
 }  
}