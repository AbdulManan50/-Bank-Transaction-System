const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

function userRegisterCOntroller(req, res) {

    const {email, name, password} = req.body;
            const isExisting = await usermodel.findOne({ email });

    if (isExisting) {
        return res.status(422).json({message: "Email already exists", status: "failed"});
    }

    const user = await usermodel.create({
        email,
        name,
        password
    }); 

    const  token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"});
    res.cookie("token", token); 

    res.status(201).json({
        user:{
        _id: user._id,
        email: user.email,
        name: user.name 
    },
    token 


});
}

module.exports = {userRegisterCOntroller};