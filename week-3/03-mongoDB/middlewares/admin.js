const express= require('express');
const { Admin } = require('../model/model');


//this middleWare does the authetication for Admin
const adminMiddleware = async (req,res,next)=>{
    const {username, password} = req.headers;
    try{
        const valid = await Admin.findOne({username:username, password:password})
        if(valid) next();
        else res.status(401).json({message: "User does not exist"})
    }
    catch(err){
        res.json({message: 'internal server error'})
    }
}


module.exports = {adminMiddleware}