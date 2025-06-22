
import { app, sequelize } from "../express";
import request from "supertest";
describe('Customer E2E Tests', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                name: 'John Doe',
                address: {
                    street: 'Street',
                    city: 'City',
                    number: 123,
                    zip: '12345'
                }
            });
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            name: 'John Doe',
            address: {
                street: 'Street',
                city: 'City',
                number: 123,
                zipCode: '12345'
            },
        });
    });

});