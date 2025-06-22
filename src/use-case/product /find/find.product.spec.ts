import Product from "../../../domain/product/entity/product";
import { ProductFactory } from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.use-case";

const mockRepo = () => ({
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([])),
    create: jest.fn(),
    update: jest.fn(),
    bulkCreate: jest.fn(),
})

describe('FindProductUseCase Unit Tests', () => {
    let useCase: FindProductUseCase;
    let productRepo: jest.MockedObject<ProductRepository>;

    beforeEach(() => {
        productRepo = mockRepo();
        useCase = new FindProductUseCase(productRepo);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should find a product', async () => {
        const input: InputFindProductDto = {
            id: '12345',
        };
        const product = ProductFactory.aProduct()
            .withId('12345')
            .withName('Product 1')
            .withPrice(100)
            .build();

        productRepo.find.mockResolvedValue(product);

        const result = await useCase.execute(input);
        expect(result).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    });

    it('should throw an error when product is not found', async () => {
        productRepo.find.mockImplementation(() => {
            throw new Error('Product not found');
        });
        const input: InputFindProductDto = {
            id: 'non-existing-id',
        };

        expect(async () => {
            await useCase.execute(input);
        }).rejects.toThrow('Product not found');
    });
});