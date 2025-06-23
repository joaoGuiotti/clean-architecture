import express, { Request, Response } from 'express';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import CreateProductUseCase from '../../../use-case/product /create/create.product.use-case';
import ListProductUseCase from '../../../use-case/product /list/list.product.use-case';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price,
        };
        const output = await useCase.execute(productDto);
        res.status(201).send(output); // Replace with actual output
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get('/', async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());
    try {
        const output = await useCase.execute();
        res.status(200).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});


