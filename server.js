import express from 'express';
import mongoose from 'mongoose';
import uRouter from './Routers/Router1.js';
import pRouter from './Routers/Router2.js';
import dotenv from 'dotenv';
import orderRouter from './Routers/Router3.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use('/api/users' , uRouter);
app.use('/api/items' , pRouter);
app.use('/api/orders' , orderRouter);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.get('/', (req, res) => {
    res.send('Server is running');
})

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})