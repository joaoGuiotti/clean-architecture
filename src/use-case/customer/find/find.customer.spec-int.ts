import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { InputFindCustomerDto } from "./find.customer.dto";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.use-case";

describe('FindCustomerUseCase Integration Tests', () => {
    let sequelize: Sequelize;
    let customerRepo: CustomerRepository;
    let useCase: FindCustomerUseCase;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    beforeEach(() => {
        customerRepo = new CustomerRepository();
        useCase = new FindCustomerUseCase(customerRepo);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should find a customer', async () => { 
        const customer = new Customer('12345', 'John');
        const address = new Address('123 Main St', 898, '12345', 'Cityville');
        customer.changeAddress(address);
        await customerRepo.create(customer);

        const input: InputFindCustomerDto = { 
            id: '12345',
        };
        const output = {
            id: '12345',
            name: 'John',
            address: {
                street: '123 Main St',
                city: 'Cityville',
                number: 898,
                zipCode: '12345',
            },
        }
        
        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });

});