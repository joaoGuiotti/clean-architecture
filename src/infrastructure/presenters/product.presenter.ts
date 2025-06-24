import { toXML, XmlOptions } from "jstoxml";
import { OutputListProductDto } from "../../use-case/product /list/list.product.dto";


export default class ProductPresenter {

    static toListXML(data: OutputListProductDto): string {
        const xmlOptions = {
            header: true,
            indent: "  ",
            newline: "\n",
            allowEmpty: true,
        };

        return toXML({
            products: {
                product: data.products.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: product.price
                }))
            }
        }, xmlOptions);
    }

}