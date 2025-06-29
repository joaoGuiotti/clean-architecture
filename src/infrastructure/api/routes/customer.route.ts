import express, { Request, Response } from 'express';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import CreateCustomerUseCase from '../../../use-case/customer/create/create.customer.use-case';
import ListCustomerUseCase from '../../../use-case/customer/list/list.customer.use-case';
import CustomerPresenter from '../../presenters/customer.presenter';

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

customerRoute.get('/', async (req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await useCase.execute();
        res.format({
            json: async () => res.send(output),
            xml: async () => res.send(CustomerPresenter.toListXML(output))
        })
    } catch (error) {
        res.status(500);
    }
});
