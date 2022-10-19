
import { upload } from "../index.js";
import asyncHandler from "express-async-handler";
import UpFile from '../models/uploadFileSchema.js'
/*************************
 * upload File
 */
export const index = async (req, res) => {
    console.log(req.file)
    console.log(req.body)

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).json(req.file)
    })
};
/***********************
 * end
 */
/*******then do thes==> */
/******************************
 * create image file 
 */
export const fileImage = asyncHandler(async (req, res) => {
    console.log(req.body)
    const imageFile = await new UpFile({
        imageup: req.body.imageup
    })
    await imageFile.save()
    res.json({ data: imageFile })
    /***********************************
     * end
     */

})

export const getImageFile = asyncHandler(async (req, res) => {

    const show = await UpFile.find()
    res.json({ data: show })
})
/******************
 * update imga file
 */
export const updateFile = asyncHandler(async (req, res) => {
    const index = await UpFile.findByIdAndUpdate(req.params.id)
    res.json({ data: index })
})
/****************************
 * 
 * end
 */









