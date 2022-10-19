import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {validationRegster}from "../models/validation.js"
import User from "../models/user.Model.js"
export const register = asyncHandler(async (req, res) => {

    const { error } = validationRegster(req.body)

/****************chek all error with joi   ./models/validation.js */
    if (error) return res.status(400).json(error.details[0].message)
    //chek if email already existe     
    const existeEmail = await User.findOne({ email: req.body.email })

    if (existeEmail) { return res.status(400).json({ message: 'email already exist' }) }
    //hashing password

    var salt = bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt)


    /// create data base

    const user = new User({
        name: req.body.name
        , email: req.body.email
        , password: hashedPassword
        ,imageUser:req.body.imageUser

    })
    try {

        const saveUser = await user.save()
        if (saveUser) {
            return res.status(200).json({ message: "secces to register" }).json({ data: saveUser._id })
        }

    } catch (err) {
        console.log(err)
        if (err) {

            res.status(400).json({ message: 'failed to register' })
        }
    }
})


export const getUser=asyncHandler(async(req,res)=>{

    const use=await User.find()
    res.json({data:use})
})
