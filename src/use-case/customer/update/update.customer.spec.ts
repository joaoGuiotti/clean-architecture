import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import UpdateCustomerUseCase from "./update.customer.use-case";

const mockRepo = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe('UpdateCustomerUseCase Unit Tests', () => {
    let useCase: UpdateCustomerUseCase;
    let customerRepo: jest.MockedObject<CustomerRepository>;

    beforeEach(() => {
        customerRepo = mockRepo();
        useCase = new UpdateCustomerUseCase(customerRepo);

        // Mocking the customer update
        const customer = CustomerFactory.aCustomer()
            .withId('12345')
            .withName('John Doe')
            .withAddress(new Address(
                '123 Main St',
                898,
                '12345',
                'Cityville',
            )).build();
        customerRepo.find.mockResolvedValue(customer);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update a customer', async () => {
        const input = {
            id: '12345',
            name: 'John Doe Updated',
            address: {
                street: '456 Elm St',
                number: 123,
                zipCode: '67890',
                city: 'New City',
            },
        };

        const output = {
            id: '12345',
            name: 'John Doe Updated',
            address: {
                street: '456 Elm St',
                city: 'New City',
                number: 123,
                zipCode: '67890',
            },
        };

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });
 
    it('should throw an error when address is invalid', async () => {
        const input = {
            id: '12345',
            name: 'John Doe Updated',
            address: {
                street: '',
                number: 123,
                zipCode: '67890',
                city: 'New City',
            },
        };

        expect(async () => {
            await useCase.execute(input);
        }).rejects.toThrow('Street is required');
    });

});

