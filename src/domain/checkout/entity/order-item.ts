import Entity from "../../shared/entity/entity.abstract";
import OrderItemFactoryValidaitor from "../factory/order-item.factory.validator";

export default class OrderItem extends Entity {
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this.validate();
    }

    validate() {
        OrderItemFactoryValidaitor.create().validate(this);
    }

    get id(): string {
        return this._id;
    }

    get quantity(): number {
        return this._quantity;
    }

    get price(): number {
        return this._price;
    }

    get name(): string {
        return this._name;
    }

    get productId(): string {
        return this._productId;
    }

    total(): number {
        return this._price * this._quantity;
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            price: this._price,
            productId: this._productId,
            quantity: this._quantity,
        }
    }
}
