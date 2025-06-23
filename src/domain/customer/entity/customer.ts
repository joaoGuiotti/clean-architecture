
//classe rica 
// auto validada
// auto encapsulada
// foco em negócio

import Entity from "../../shared/entity/entity.abstract";
import NotificationError from "../../shared/notification/notification.error";
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

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors);
        }
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
        if (this._address === undefined) {
            throw new Error('Address is required to activate a customer');
        }
        this._active = true;
    }

    get address(): Address {
        return this._address;
    }

    deactivate(): void {
        this._active = false;
    }

    addRewardPoints(points: number) {
        if (points <= 0) {
            throw new Error('Points must be greater than zero');
        }
        this._rewardPoints += points;
    }

    validate() {
        if (this._id.length === 0) {
            this.notification.addError({
                context: 'customer',
                message: 'Id is required',
            });
        }
        if (this._name.length === 0) {
            this.notification.addError({
                context: 'customer',
                message: 'Name is required',
            });
        }
        if (this._address) {
            this._address.validate();
            if (this._address.notification.hasErrors()) {
                this.notification.copyErrors(this._address.notification);
            }
        }
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