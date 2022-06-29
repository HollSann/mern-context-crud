import Post from '../models/post.js'
import { uploadImage, deleteImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'


//GET POSTS
export const getPosts = async (req, res) => {

    try {

        const posts = await Post.find()//buscará todas las publicaciones que estén guardadas en la base de datos    
        res.send(posts)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ message: error.message })
    }
}
//CREATE POST
export const createPost = async (req, res) => {
    try {
        let image;

        const { title, description } = (req.body) //destructuración del body para crear dos objetos, el titulo y la descriptción

        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }

        }
        const newPost = new Post({ title, description, image })
        await newPost.save()//Se guarda de forma asincrona en la base de datos
        return res.json(newPost)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}
//ACTUALIZAR POST
export const updatePost = async (req, res) => {

    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.send(updatedPost)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ message: error.message })
    }
}
//ELIMINAR POST
export const deletePost = async (req, res) => {
    try {
        const postRemoved = await Post.findByIdAndDelete(req.params.id)
        if (!postRemoved) return res.sendStatus(404)

        if (postRemoved.image.public_id) {
            await deleteImage(postRemoved.image.public_id)
        }
        return res.sendStatus(204)

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ message: error.message })
    }
}
//GET POST
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.sendStatus(404)
        return res.json(post)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ message: error.message })
    }
}