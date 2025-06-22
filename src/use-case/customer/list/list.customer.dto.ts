
export interface InputListCustomerDto { };

type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zipCode: string;
    };
}

export interface OutputListCustomerDto {
    customers: Customer[];
}