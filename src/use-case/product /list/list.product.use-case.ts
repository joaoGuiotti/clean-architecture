import IProductRepository from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";


export default class ListProductUseCase {

    constructor(private readonly productRepository: IProductRepository) { }

    public async execute(input: InputListProductDto = {}): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();

        return {
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        };
    }
}
