import express from 'express';
import 'dotenv/config';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import connectDatabase from './database/mongooseConfiguration.js';

connectDatabase();

const port = process.env.PORT || 5000;
const app = express();

// To parse the incoming requests with strings or arrays
// app.use(express.urlencoded({ extended: true }));

// To parse the incoming requests with JSON payloads
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
