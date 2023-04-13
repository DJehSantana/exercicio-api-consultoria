import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { documentRouter } from "./src/routes/document.route.js";
import { logger } from "./src/middlewares/logger.js";
import mongoose from "mongoose";
import { userRouter } from "./src/routes/user.route.js";
import { loginRouter } from "./src/routes/login.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGODB;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB...'))
    .catch(err => console.error('Não foi possível conectar ao MongoDB...', err
    ));



app.use(express.json());
app.use(cors());

app.use('/document', documentRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);

app.use((error, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
    res.status(400).json({
        error: error.message
    });
});

app.listen(PORT, () => {
    console.log('Server running in port: ' + PORT);
});
