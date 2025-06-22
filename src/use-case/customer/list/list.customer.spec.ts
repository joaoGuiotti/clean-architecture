import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.use-case";

const mockRepo = () => ({
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([])),
    create: jest.fn(),
    update: jest.fn(),
});

describe('ListCustomerUseCase Unit Tests', () => {
    let useCase: ListCustomerUseCase;
    let customerRepo: jest.MockedObject<CustomerRepository>;

    beforeEach(() => {
        customerRepo = mockRepo();
        useCase = new ListCustomerUseCase(customerRepo);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should list customers', async () => {
        const customers = CustomerFactory.theCustomers(5)
            .withName((i) => `Customer ${i + 1}`)
            .withRandomAddress()
            .build();
        customerRepo.findAll.mockReturnValue(Promise.resolve(customers));

        const output = await useCase.execute();
        expect(output.customers.length).toBe(5);
        customers.forEach((customer, index) => {
            expect(output.customers[index].id).toBe(customer.id);
            expect(output.customers[index].name).toBe(customer.name);
            expect(output.customers[index].address.street).toBe(customer.address.street);
            expect(output.customers[index].address.city).toBe(customer.address.city);
            expect(output.customers[index].address.number).toBe(customer.address.number);
            expect(output.customers[index].address.zipCode).toBe(customer.address.zip);
        });
    });
});
