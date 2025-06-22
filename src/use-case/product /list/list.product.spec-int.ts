import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.use-case";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductFactory } from "../../../domain/product/factory/product.factory";


describe('ListProductUseCase Integration Tests', () => {
    let sequelize: Sequelize;
    let productRepo: ProductRepository;
    let useCase: ListProductUseCase;

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
        useCase = new ListProductUseCase(productRepo);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should list products', async () => {
        const products = ProductFactory.theProducts(3).build();
        await productRepo.bulkCreate(products);

        jest.spyOn(productRepo, 'findAll').mockResolvedValue(products);
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