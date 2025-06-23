
//classe rica 
// auto validada
// auto encapsulada
// foco em negócio

import Entity from "../../shared/entity/entity.abstract";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
    private _name: string = '';
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    changeAddress(address: Address) {
        this._address = address;
        this.validate();
    }

    isActive(): boolean {
        return this._active;
    }

    activate(): void {
        this._active = true;
        this.validate();
    }

    get address(): Address {
        return this._address;
    }

    deactivate(): void {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
        this.validate();
    }

    validate() {
        CustomerValidatorFactory.create().validate(this);
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            address: this._address.toJSON(),
            active: this._active,
            rewardPoints: this._rewardPoints,
        }
    }
}