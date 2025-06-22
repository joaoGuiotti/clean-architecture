import { ProductFactory } from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.use-case";

const mockRepo = () => ({
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    bulkCreate: jest.fn(),
});

describe('ListProductUseCase Unit Tests', () => {
    let useCase: ListProductUseCase;
    let productRepo: jest.MockedObject<ProductRepository>;

    beforeEach(() => {
        productRepo = mockRepo();
        useCase = new ListProductUseCase(productRepo);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should list products', async () => {
        const products = ProductFactory.theProducts(3).build();
        productRepo.findAll.mockResolvedValue(products);

        const output = await useCase.execute();

        expect(output).toEqual({
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        });
        expect(productRepo.findAll).toHaveBeenCalled();
    });
});