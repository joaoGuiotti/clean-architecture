import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { InputCreateCustomerDto } from "./create.customer.dto";
import CreateCustomerUseCase from "./create.customer.use-case";

const mockRepo = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('CreateCustomerUseCase Unit Tests', () => {
    let useCase: CreateCustomerUseCase;
    let customerRepo: jest.MockedObject<CustomerRepository>;

    beforeEach(() => {
        customerRepo = mockRepo();
        useCase = new CreateCustomerUseCase(customerRepo);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a customer', async () => {
        const input: InputCreateCustomerDto = {
            name: 'John',
            address: {
                street: '123 Main St',
                city: 'Cityville',
                number: 898,
                zipCode: '12345',
            },
        };
        const output = await useCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: 'John',
            address: {
                street: '123 Main St',
                city: 'Cityville',
                number: 898,
                zipCode: '12345',
            },
        });
    });
});