import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.use-case";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe('CreateProductUseCase Integration Tests', () => {
    let sequelize: Sequelize;
    let productRepo: ProductRepository;
    let useCase: CreateProductUseCase;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    beforeEach(() => {
        productRepo = new ProductRepository();
        useCase = new CreateProductUseCase(productRepo);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        const input = {
            name: 'Product 1',
            price: 100,
        };
        const output = await useCase.execute({
            name: input.name,
            price: input.price,
        });
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
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

        await expect(useCase.execute(input)).rejects.toThrow('Product: Price must be greater than or equal to zero');
    });
});



