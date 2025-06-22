import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import FindProductUseCase from "./find.product.use-case";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ProductFactory } from "../../../domain/product/factory/product.factory";

describe('FindProductUseCase Integration Tests', () => {
    let sequelize: Sequelize;
    let productRepo: ProductRepository;
    let useCase: FindProductUseCase;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    beforeEach(() => {
        productRepo = new ProductRepository();
        useCase = new FindProductUseCase(productRepo);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should find a product', async () => {
        const input = ProductFactory.aProduct()
            .withId('12345')
            .withName('Product 1')
            .withPrice(100)
            .build();
        await productRepo.create(input);
        const result = await useCase.execute({ id: '12345' });
        expect(result).toEqual({
            id: '12345',
            name: 'Product 1',
            price: 100,
        });
    });

    it('should throw an error when product is not found', async () => {
        const input = { id: 'non-existing-id' };
        await expect(useCase.execute(input)).rejects.toThrow('Product not found');
    });
});