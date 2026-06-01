import { Request, Response } from 'express';
import { Popup } from 'src/models/Popup.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

const getPopups = async (req: Request, res: Response) => {
    try{
        const popups = await Popup.find();
        res.status(200).json({status: 'success', data: popups});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching popups', error });
    }
}

const uploadPopup = async (req: Request, res: Response) => {
    try {
          if (!req.file) {
            return res.status(400).json({
              message: "No image uploaded",
            })
          }
    
          const streamUpload = () => {
            return new Promise<any>((resolve, reject) => {
              const stream =
                cloudinary.uploader.upload_stream(
                  {
                    folder: "popup",
                  },
                  (error, result) => {
                    if (result) resolve(result)
                    else reject(error)
                  }
                )
    
              streamifier.createReadStream(req.file!.buffer)
                .pipe(stream)
            })
          }
    
          const result = await streamUpload()
    
          console.log("Cloudinary Upload Result: ", JSON.stringify(result, null, 2))
    
          res.json({ message: "Image uploaded successfully", url: result.secure_url, public_id: result.public_id })
    
        } catch (error) {
          console.error("An Error has Occurred: " + error)
    
          res.status(500).json({
            message: "Upload failed",
          })
        }
}
export {
    getPopups,
    uploadPopup
}