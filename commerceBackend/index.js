import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import connectDB from "./connectDB.js";
import router from "./Routes/product.js";

dotenv.config();  
connectDB();

const app = express();
app.use(bodyParser.json({limit: "30mb" , extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const port = process.env.PORT || 5500

app.get('/', (req, res) => {
    res.send("app is running");
})
app.use('/products', router);

mongoose.connection.once("open", () => {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
      });
})