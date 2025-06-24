import NotificationError from "../../shared/notification/notification.error";
import IValidator from "../../shared/validator/validator.interface";
import Order from "../entity/order";
import * as yup from 'yup';

export default class OrderYupValidator
    implements IValidator<Order> {

    validate(entity: Order): void {
        try {
            const schema = yup.object().shape({
                id: yup.string().required('Id is required'),
                customerId: yup.string().required('CustomerId is required'),
                items: yup.array().min(1, 'Items length must be greater than 0'),
            });

            schema.validateSync({
                id: entity.id,
                customerId: entity.customerId,
                items: entity.items,
            }, { abortEarly: false });
        } catch (error) {
            const errors = (error as yup.ValidationError).errors;
            errors.forEach((message: string) => {
                entity.notification.addError({
                    context: Order.name,
                    message,
                });
            });

            if (entity.notification.hasErrors()) {
                throw new NotificationError(entity.notification.getMessagesNormalized());
            }
        }
    }

}