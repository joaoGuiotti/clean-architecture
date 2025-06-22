import Customer from "../../../domain/customer/entity/customer";
import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {

    private readonly customerRepository: ICustomerRepository;

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
    }

    public async execute(input: InputListCustomerDto = {}): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper {
    static toOutput(customers: Customer[]): OutputListCustomerDto {
        return {
            customers: customers.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    city: customer.address.city,
                    number: customer.address.number,
                    zipCode: customer.address.zip,
                },
            })),
        };
    }
}