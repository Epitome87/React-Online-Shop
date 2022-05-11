import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
const products = { name: "matthew" };

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send('Home route');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});