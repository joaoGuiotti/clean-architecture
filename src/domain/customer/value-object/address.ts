import Entity from "../../shared/entity/entity.abstract";
import NotificationError from "../../shared/notification/notification.error";

// type VO: Value Object
export default class Address extends Entity {
    private _street: string;
    private _number: number;
    private _zip: string;
    private _city: string;

    constructor(street: string, number: number, zip: string, city: string) {
        super();
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getMessagesNormalized());
        }
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }

    validate() {
        if (this._street.length === 0) {
            this.notification.addError({ message: 'Street is required', context: 'Address' });
        }
        if (this._number <= 0) {
            this.notification.addError({ message: 'Number must be greater than zero', context: 'Address' });
        }
        if (this._zip.length === 0) {
            this.notification.addError({ message: 'Zip is required', context: 'Address' });
        }
        if (this._city.length === 0) {
            this.notification.addError({ message: 'City is required', context: 'Address' });
        } 
    }

    toString(): string {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`;
    }

    toJSON() {
        return {
            street: this._street,
            number: this._number,
            zip: this._zip,
            city: this._city,
        }
    }

}