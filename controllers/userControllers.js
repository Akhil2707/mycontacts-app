const asyncHandler=require('express-async-handler');
const User= require("../models/userModel");
const bcrypt=require('bcrypt');

//@desc Register the user 
//@route POSt api/users/register
//@access public

const registerUser =asyncHandler(async(req,res)=>{
const{username,email,password}=req.body
if(!username || !email || !password){
    res.status(400)
    throw new Error(" all fields are mandatory")
}
const emailAvailable = await User.findOne({email})
if(emailAvailable){
    res.status(400);
    throw new Error("User is already registered")
}

//hash password
const hashedPassword = await bcrypt.hash(password, 10);
console.log("Hashed password:" ,hashedPassword);
const user = await User.create({
    username,
    email,
    password: hashedPassword
})

if(user){
    res.status(201).json({_id:user.id,email:user.email})
}else{
res.status(404).json({message:"user data is not valid"})
}


});

//@desc Login the user 
//@router /api/users/login
//access public

const loginUser = asyncHandler(async(req,res)=>{
res.json({message:"user logged in successfully"})
});


//@desc current user
//@router /api/users/current
//access private
const currentUser = asyncHandler(async(req,res)=>{
res.json({messsage:"current user information"})
});

module.exports ={
    loginUser,
    currentUser,
    registerUser
}