import Entity from "../../shared/entity/entity.abstract";
import NotificationError from "../../shared/notification/notification.error";
import IProduct from "./product.interface";

export default class Product extends Entity implements IProduct {
    private _name: string;
    private _price: number = 0;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validateErrors();
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    changeName(name: string) {
        this._name = name;
        this.validateErrors();
    }

    changePrice(price: number) {
        this._price = price;
        this.validateErrors();
    }

    validate() {
        if (this._id.length === 0) {
            this.notification.addError({
                context: 'Product',
                message: 'Id is required'
            });
        }
        if (this._name.length === 0) {
            this.notification.addError({
                context: 'Product',
                message: 'Name is required'
            });
        }
        if (this._price < 0) {
            this.notification.addError({
                context: 'Product',
                message: 'Price must be greater than or equal to zero'
            });
        }
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            price: this.price
        }
    }

    private validateErrors() {
        this.validate();
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors);
        }
    }
}