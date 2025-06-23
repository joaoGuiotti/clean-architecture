import NotificationError from "../../shared/notification/notification.error";
import IValidator from "../../shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from 'yup';

export default class ProductYupValidator
    implements IValidator<Product> {

    validate(entity: Product): void {
        try {
            const schema = yup.object().shape({
                id: yup.string().required('Id is required'),
                name: yup.string().required('Name is required'),
                price: yup.number().min(0, 'Price must be greater than or equal to zero').required('Price is required'),
            });

            schema.validateSync({
                id: entity.id,
                name: entity.name,
                price: entity.price,
            }, { abortEarly: false });
        } catch (error) {
            const errors = (error as yup.ValidationError).errors;
            errors.forEach((message: string) => {
                entity.notification.addError({
                    context: Product.name,
                    message: message,
                });
            });
            if (entity.notification.hasErrors()) {
                throw new NotificationError(entity.notification.getMessagesNormalized());
            }
        }
    }

}