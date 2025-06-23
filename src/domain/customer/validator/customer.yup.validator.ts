import NotificationError from "../../shared/notification/notification.error";
import IValidator from "../../shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from 'yup';

export default class CustomerYupValidator
    implements IValidator<Customer> {

    validate(entity: Customer): void {
        try {
            const schema = yup.object().shape({
                id: yup.string().required('Id is required'),
                name: yup.string().required('Name is required'),
                address: yup.mixed().nullable(),
                active: yup.boolean().test(
                    'address-required-to-activate',
                    'Address is required to activate a customer',
                    function (value) {
                        if (value && !this.parent.address) {
                            return false;
                        }
                        return true;
                    }
                ),
                rewardPoints: yup.number().min(0, 'Points must be greater than zero').nullable(),
            });

            schema.validateSync({
                id: entity.id,
                name: entity.name,
                address: entity.address ?? null,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints,
            }, { abortEarly: false });
        } catch (error) {
            const errors = (error as yup.ValidationError).errors;
            errors.forEach((message: string) => {
                entity.notification.addError({
                    context: Customer.name,
                    message: message,
                });
            });
            if (entity.notification.hasErrors()) {
                throw new NotificationError(entity.notification.getMessagesNormalized());
            }
        }
    }
}