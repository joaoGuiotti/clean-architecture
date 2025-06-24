import OrderYupValidator from "../validator/order.yup.validator";

export default class OrderFactoryValidator {
    static create() {
        return new OrderYupValidator();
    }
}