import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";


export default class UpdateCustomerUseCase { 

    private readonly customerRepository: ICustomerRepository;
    
    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
    }

    public async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.customerRepository.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress(new Address(
            input.address.street,
            input.address.number,
            input.address.zipCode,
            input.address.city,
        ));
        await this.customerRepository.update(customer);
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