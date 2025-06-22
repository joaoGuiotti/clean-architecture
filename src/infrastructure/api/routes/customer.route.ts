import express, { Request, Response } from 'express';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import CreateCustomerUseCase from '../../../use-case/customer/create/create.customer.use-case';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zipCode: req.body.address.zip,
            }
        };
        const output = await useCase.execute(customerDto);
        res.status(201).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});
