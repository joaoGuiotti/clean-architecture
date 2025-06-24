import OrderItemYupValidator from "../validator/order-item.yup.validator";

export default class OrderItemFactortyValidaitor {
    static create() {
        return new OrderItemYupValidator();
    }
}