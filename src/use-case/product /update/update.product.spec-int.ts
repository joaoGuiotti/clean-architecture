import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.use-case";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductFactory } from "../../../domain/product/factory/product.factory";

describe('UpdateProductUseCase Integration Tests', () => {
    let sequelize: Sequelize;
    let productRepo: ProductRepository;
    let useCase: UpdateProductUseCase;

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
        useCase = new UpdateProductUseCase(productRepo);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should update a product', async () => {
        const product = ProductFactory.aProduct()
            .withId('12345')
            .withName('Product A')
            .withPrice(100)
            .build();
        jest.spyOn(productRepo, 'update');
        await productRepo.create(product);

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