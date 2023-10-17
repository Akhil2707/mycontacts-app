const express= require('express');
const router=express.Router();
const{registerUser,loginUser,currentUser}=require('../controllers/userControllers')

router.post("/register",registerUser);

router.post("/login",loginUser);

router.post("/current",currentUser);

module.exports=router;