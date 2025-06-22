
import { app, sequelize } from "../express";
import request from "supertest";

describe('Product E2E Tests', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                name: 'Product A',
                price: 100
            });
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            name: 'Product A',
            price: 100,
        });
    });

    it('should not create a product with empty name', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                name: '',
                price: 100
            });
        expect(response.status).toBe(500);
    });

    it('should list all customers', async () => {
        const products = [
            {
                name: 'Product A',
                price: 100
            },
            {
                name: 'Product B',
                price: 200
            }
        ];

        for (const product of products) {
            await request(app)
                .post('/products')
                .send(product);
        }

        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);
        expect(response.body.products[0]).toMatchObject(products[0]);
        expect(response.body.products[1]).toMatchObject(products[1]);
    });

});