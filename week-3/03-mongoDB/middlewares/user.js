const mongoose = require('mongoose')
const {User} = require('../model/model')
const express = require('express')

const userMiddleware =  async (req,res,next)=>{
    const {username, password} = req.headers;
    const user = await User.findOne({username, password})
    if(user) next()
    else res.status(401).json({message:'wrong credentials'})
}

module.exports = {userMiddleware}

