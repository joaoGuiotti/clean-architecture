import Product from "./product";

describe('Product unit tests', () => {
    it('Should throw error when id is empty', () => {
        expect(() => {
            const product = new Product('', 'Product 1', 100.20);
        }).toThrow('Id is required');
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            const prod = new Product('12', '', 100);
        }).toThrow('Name is required');
    });

    it('should throw error when price is less than zero', () => {
        expect(() => {
            const prod = new Product('12', 'Prod 1', -1);
        }).toThrow('Price must be greater than or equal to zero');
    });

    it('should change name', () => {
        const prod = new Product('12', 'Prod 1', 1);
        prod.changeName('Prod 2');
        expect(prod.name).toBe('Prod 2');
    });

    it('should throw error when changing name to empty', () => {
        const prod = new Product('12', 'Prod 1', 1);
        expect(() => {
            prod.changeName('');
        }).toThrow('Name is required');
    });

    it('should change price', () => {
        const prod = new Product('12', 'Prod 1', 1);
        prod.changePrice(99.99);
        expect(prod.price).toBe(99.99);
    });

    it('should throw error when changing price to less than zero', () => {
        const prod = new Product('12', 'Prod 1', 1);
        expect(() => {
            prod.changePrice(-1);
        }).toThrow('Price must be greater than or equal to zero');
    });

    it('should get more than one error', () => {
        expect(() => {
            new Product('', '', -1);
        }).toThrow('Product: Id is required, Product: Name is required, Product: Price must be greater than or equal to zero');
    });
})