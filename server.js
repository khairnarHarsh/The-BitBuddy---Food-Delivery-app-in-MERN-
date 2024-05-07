import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
// const path = require("path");
import path from 'path'
// import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// app config
const app = express()
const port = 4000

// middleware
app.use(cors()) // enable C
app.use(express.json()) // enable C
// db connection 
connectDB()
// api endpoint


app.use('/api/food',foodRouter)
app.use('/api/user',userRouter)
app.use('/images',express.static('uploads'))
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)





app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
app.get("/admin", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "admin", "build")));
    res.sendFile(path.resolve(__dirname, "admin", "build", "index.html"));
    });
    

app.listen(port, () => {
 console.log(`server started on ${port}`);
})


