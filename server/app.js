import express from "express";
import fileUpload from "express-fileupload";
import postsRoutes from './routes/posts.routes.js'
import { dirname, join } from 'path'
import { fileURLToPath } from "url";
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
//midleware
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true, //Cuando se suba una imagen no lo mantenga en memorio, si no que lo guarde en una carpeta
    tempFileDir: './upload'
}))
//routes
app.use(postsRoutes)
app.use(express.static(join(__dirname, '../client/build')))
export default app;