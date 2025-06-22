import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { InputFindCustomerDto } from "./find.customer.dto";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.use-case";

const mockRepo = () => {
    const customer = new Customer('12345', 'John');
    const address = new Address('123 Main St', 898, '12345', 'Cityville');
    customer.changeAddress(address);

    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('FindCustomerUseCase Unit Tests', () => {
    let useCase: FindCustomerUseCase;
    let customerRepo: jest.MockedObject<CustomerRepository>;

    beforeEach(() => {
        customerRepo = mockRepo();
        useCase = new FindCustomerUseCase(customerRepo);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should find a customer', async () => {
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

    it('should throw an error when customer is not found', async () => {
        customerRepo.find.mockImplementation(() => {
            throw new Error('Customer not found');
        });
        const input: InputFindCustomerDto = {
            id: 'non-existing-id',
        };
        
        expect(async () => {
            await useCase.execute(input);
        }).rejects.toThrow('Customer not found');
    });
});