import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { documentRouter } from "./src/routes/document.route.js";
import { logger } from "./src/middlewares/logger.js";

import connectDatabase from "./src/db/connection.mongodb.js";

import { userRouter } from "./src/routes/user.route.js";
import { loginRouter } from "./src/routes/login.route.js";
import schedule from 'node-schedule'
import {findDueDocuments} from "./src/services/schedule.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

connectDatabase();

//'seg min hora dia mes dia-da-semana'
// ex.: '1 * * * * *' todo minuto e 1 segundo
// ex.: '* * 9 * * *' todo dia as 9h
schedule.scheduleJob('1 * * * * *', async () => {
    findDueDocuments()
})


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
