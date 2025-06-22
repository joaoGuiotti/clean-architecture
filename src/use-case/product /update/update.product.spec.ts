import { ProductFactory } from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.use-case";

const mockRepo = () => ({
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    bulkCreate: jest.fn(),
});

describe('UpdateProductUseCase Unit Tests', () => {

    let useCase: UpdateProductUseCase;
    let productRepo: jest.MockedObject<ProductRepository>;

    beforeEach(() => {
        productRepo = mockRepo();
        useCase = new UpdateProductUseCase(productRepo);

        // Mocking the product update
        const product = ProductFactory.aProduct()
            .withId('12345')
            .withName('Product A')
            .withPrice(100)
            .build();
        productRepo.find.mockResolvedValue(product);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update a product', async () => {
        const input = {
            id: '12345',
            name: 'Product A Updated',
            price: 150,
        };

        const output = {
            id: '12345',
            name: 'Product A Updated',
            price: 150,
        };

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
        expect(productRepo.update).toHaveBeenCalled();
    });

    it('should throw an error if product name is empty', async () => {
        const input = {
            id: '12345',
            name: '',
            price: 150,
        };

        await expect(useCase.execute(input)).rejects.toThrow('Name is required');
    });
});