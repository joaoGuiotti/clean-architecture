import { ProductFactory } from "../../../domain/product/factory/product.factory";
import IProductRepository from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";


export default class CreateProductUseCase {

    constructor(private readonly productRepository: IProductRepository) { }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFactory.aProduct()
            .withName(input.name)
            .withPrice(input.price)
            .build();
        await this.productRepository.create(product);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}