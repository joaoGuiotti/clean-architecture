
import { toXML, XmlOptions } from "jstoxml";
import { OutputListCustomerDto } from "../../use-case/customer/list/list.customer.dto";

export default class CustomerPresenter {

    static toListXML(data: OutputListCustomerDto): string {
        const xmlOption = {
            header: true,
            indent: "  ",
            newline: "\n",
            allowEmpty: true,
        };

        return toXML(
            {
                customers: {
                    customer: data.customers.map((customer) => ({
                        id: customer.id,
                        name: customer.name,
                        address: {
                            street: customer.address.street,
                            number: customer.address.number,
                            zipCode: customer.address.zipCode,
                            city: customer.address.city,
                        },
                    })),
                },
            },
            xmlOption
        );
    }

}