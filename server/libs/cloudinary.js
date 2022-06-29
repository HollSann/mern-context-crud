import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: "sangabholl",
    api_key: "137883356183571",
    api_secret: "jClXEVdaqn0wEEtM66GdFJzmrT4",

})
export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'posts'
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}