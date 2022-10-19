import mongoose from "mongoose";

const uploadFileShchema=mongoose.Schema({
    title:{
        type:String,

    },
    imageup:{
        type:Object,
    }
})

const upFile= mongoose.model('File',uploadFileShchema)
export default upFile