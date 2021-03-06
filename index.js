import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';

import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import activeUserRoutes from './routes/activeUser.js';

const app = express();

dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/activeUsers', activeUserRoutes);

app.get('/', (req,res) =>{
    res.send('Hello Pizza Gang');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false);
