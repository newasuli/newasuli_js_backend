import {Gallery} from '../models/Gallery.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

import { Request, Response } from 'express';

const fetchGallery = async (req: Request, res: Response) => {
  try {
    const data = await Gallery.find();
    res.status(200).json({ status: 'success', data: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
};

const uploadGallery = async (req: Request, res: Response) => {
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
                folder: "gallery",
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

      // console.log("Cloudinary Upload Result: ", JSON.stringify(result, null, 2))

      res.json({ message: "Image uploaded successfully", url: result.secure_url, public_id: result.public_id })

    } catch (error) {
      console.error("An Error has Occurred: " + error)

      res.status(500).json({
        message: "Upload failed",
      })
    }
};

export { fetchGallery, uploadGallery };