import express from 'express';
import data from '../Data.js';
import expressAsyncHandler from 'express-async-handler';
import pModel from '../DataModel/Model2.js';

const pRouter = express.Router();

pRouter.get('/', expressAsyncHandler(async(req, res) => {
    //return all products to the frontend when frontend calls /api/items
    const items = await pModel.find({}); 
    res.send(items);
}));

pRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await pModel.remove({});
    const createItem = await pModel.insertMany(data.items); 
    res.send({ createItem });
}) 
);
 
pRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const item = await pModel.findById(req.params.id);
    if(item) {
        res.send(item);
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
}))
export default pRouter;