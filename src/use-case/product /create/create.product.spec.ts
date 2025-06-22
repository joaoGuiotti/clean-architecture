import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.use-case";


const mockRepo = () => ({
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    bulkCreate: jest.fn(),
});

describe('CreateProductUseCase Unit Tests', () => {
    let useCase: CreateProductUseCase;
    let productRepo: jest.MockedObject<ProductRepository>;

    beforeEach(() => {
        productRepo = mockRepo();
        useCase = new CreateProductUseCase(productRepo);
    });

    it('should create a product', async () => {
        const input = {
            name: 'Product 1',
            price: 100,
        };

        await useCase.execute(input);

        expect(productRepo.create).toHaveBeenCalled();
        expect(productRepo.create).toHaveBeenCalledWith(expect.objectContaining({
            name: input.name,
            price: input.price,
        }));
    });

    it('should throw an error if product name is empty', async () => {
        const input = {
            name: '',
            price: 100,
        };

        await expect(useCase.execute(input)).rejects.toThrow('Name is required');
    });

    it('should throw an error if product price is negative', async () => {
        const input = {
            name: 'Product 1',
            price: -100,
        };

        await expect(useCase.execute(input)).rejects.toThrow('Price must be greater than zero');
    });
 });

