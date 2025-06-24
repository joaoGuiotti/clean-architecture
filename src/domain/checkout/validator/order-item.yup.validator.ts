import IValidator from "../../shared/validator/validator.interface";
import * as yup from 'yup';
import OrderItem from "../entity/order-item";
import NotificationError from "../../shared/notification/notification.error";

export default class OrderItemYupValidator
    implements IValidator<OrderItem> {

    validate(entity: OrderItem): void {
        try {
            const schema = yup.object().shape({
                id: yup.string().required('Id is required'),
                name: yup.string().required('Name is required'),
                price: yup.number()
                    .min(0, 'Price must be greater than zero').required(),
                quantity: yup.number()
                    .min(0, 'Quantity must be greater than zero').required(),
            });

            schema.validateSync({
                id: entity.id,
                name: entity.name,
                price: entity.price,
                quantity: entity.quantity,
            }, { abortEarly: false });
        } catch (error) {
            const errors = (error as yup.ValidationError).errors;
            errors.forEach((message: string) => {
                entity.notification.addError({
                    context: OrderItem.name,
                    message,
                });
            });
            if (entity.notification.hasErrors()) {
                throw new NotificationError(entity.notification.getMessagesNormalized());
            }
        }
    }

}