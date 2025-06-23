import Entity from "../../shared/entity/entity.abstract";
import ProductValidatorFactory from "../factory/product.validator.factory";
import IProduct from "./product.interface";

export default class Product extends Entity implements IProduct {
    private _name: string;
    private _price: number = 0;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }

    validate() {
        ProductValidatorFactory.create().validate(this);
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            price: this.price
        }
    }
}