import express from "express";
import { getUser, register } from "../controles/signup.js";
import { fileImage,  getImageFile, index, updateFile } from "../controles/uploadFile.js";

const router=express.Router()


router.route('/file').post(index)

router.route('/newfile').post(fileImage)

router.route('/get').get(getImageFile)

router.route('/update/:id').post(updateFile)

router.route('/signup').post(register)

router.route('/getUser').post(getUser)

export default router