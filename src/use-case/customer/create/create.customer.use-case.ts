import { v4 as uuid } from "uuid";
import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";


export default class CreateCustomerUseCase {
    private readonly customerRepository: ICustomerRepository;

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
    }

    public async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = CustomerFactory.aCustomer()
            .withName(input.name)
            .withAddress(new Address(
                input.address.street,
                input.address.number,
                input.address.zipCode,
                input.address.city,
            )).build();
        await this.customerRepository.create(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zipCode: customer.address.zip,
            },
        };
    }
}