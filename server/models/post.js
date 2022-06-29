import mongoose from "mongoose";


//modelo para crear publicación y guardarla en la BD

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        url: String,
        public_id: String,

    }

})

export default mongoose.model('Post', postSchema)