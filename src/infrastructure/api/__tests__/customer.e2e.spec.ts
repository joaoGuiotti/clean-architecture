
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

    it('should not create a customer with empty name', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                name: '',
                address: {
                    street: 'Street',
                    city: 'City',
                    number: 123,
                    zip: '12345'
                }
            });
        expect(response.status).toBe(500);
    });

    it('should list all customers', async () => {
        const customers = [
            {
                name: 'John Doe',
                address: {
                    street: 'Street',
                    city: 'City',
                    number: 123,
                    zip: '12345'
                }
            },
            {
                name: 'Jane Smith',
                address: {
                    street: 'Another Street',
                    city: 'Another City',
                    number: 456,
                    zip: '67890'
                }
            }
        ];
        for (const customer of customers) {
            await request(app)
                .post('/customers')
                .send(customer);
        }

        const response = await request(app)
            .get('/customers');

        expect(response.status).toBe(200);
        expect(response.body.customers.length).toBe(2);
        expect(response.body.customers[0]).toMatchObject({
            name: 'John Doe',
            address: {
                street: 'Street',
                city: 'City',
                number: 123,
                zipCode: '12345'
            },
        });
        expect(response.body.customers[1]).toMatchObject({
            name: 'Jane Smith',
            address: {
                street: 'Another Street',
                city: 'Another City',
                number: 456,
                zipCode: '67890'
            },
        });
    });

    describe('response in XML', () => {

        beforeEach(async () => {
            const customers = [
                {
                    name: 'John Doe',
                    address: {
                        street: 'Street',
                        city: 'City',
                        number: 123,
                        zip: '12345'
                    }
                },
                {
                    name: 'Jane Smith',
                    address: {
                        street: 'Another Street',
                        city: 'Another City',
                        number: 456,
                        zip: '67890'
                    }
                }
            ];
            for (const customer of customers) {
                await request(app)
                    .post('/customers')
                    .send(customer);
            }
        });

        it('should return all customer in XML format', async () => {
            const listResponseXML = await request(app)
                .get('/customers')
                .set('Accept', 'application/xml')
                .send();
            expect(listResponseXML.status).toBe(200);
            expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
            expect(listResponseXML.text).toContain(`<name>John Doe</name>`);
            expect(listResponseXML.text).toContain(`<address>`);
            expect(listResponseXML.text).toContain(`<street>Street</street>`);
            expect(listResponseXML.text).toContain(`<city>City</city>`);
            expect(listResponseXML.text).toContain(`<number>123</number>`);
            expect(listResponseXML.text).toContain(`<zipCode>12345</zipCode>`);
            expect(listResponseXML.text).toContain(`</address>`);
            expect(listResponseXML.text).toContain(`<name>Jane Smith</name>`);
        });
    });
});