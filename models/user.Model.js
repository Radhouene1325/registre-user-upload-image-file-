import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    imageUser:{type:mongoose.Schema.Types.ObjectId,ref:'File'}
})

 const user=mongoose.model('User',userSchema)
export default user