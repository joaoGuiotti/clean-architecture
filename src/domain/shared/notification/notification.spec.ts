import Notification from "./notification";

describe('Notification Unit Tests', () => {

    it('should create a notification for errors', () => {
        const notification = new Notification();
        const error = {
            message: 'Error message',
            context: 'customer',
        };
        notification.addError(error);
        expect(notification.hasErrors()).toBeTruthy();
        expect(notification.getMessages('customer')).toEqual(['Error message']);
        expect(notification.getMessagesNormalized()).toBe('customer: Error message');

        const error2 = {
            message: 'Another error message',
            context: 'customer',
        };
        notification.addError(error2);

        expect(notification.hasErrors()).toBeTruthy();
        expect(notification.getMessages('customer')).toEqual([
            'Error message',
            'Another error message',
        ]);
        expect(notification.getMessagesNormalized()).toBe('customer: Error message, customer: Another error message');
    });

    it('should return empty messages when no errors are present', () => {
        const notification = new Notification();
        expect(notification.hasErrors()).toBeFalsy();
        expect(notification.getMessages()).toEqual([]);
        expect(notification.getMessagesNormalized()).toBe('');
    });

    it('should return all messages when no context is provided', () => {
        const notification = new Notification();
        const error1 = {
            message: 'First error message',
            context: 'customer',
        };
        const error2 = {
            message: 'Second error message',
            context: 'order',
        };
        notification.addError(error1);
        notification.addError(error2);

        expect(notification.hasErrors()).toBeTruthy();
        expect(notification.getMessages()).toEqual(['First error message', 'Second error message']);
        expect(notification.getMessagesNormalized()).toBe('customer: First error message, order: Second error message');
    });

    it('should copy errors from another notification', () => {
        const notification1 = new Notification();
        const error1 = {
            message: 'Error in first notification',
            context: 'customer',
        };
        notification1.addError(error1);

        const notification2 = new Notification();
        notification2.copyErrors(notification1);

        expect(notification2.hasErrors()).toBeTruthy();
        expect(notification2.getMessages('customer')).toEqual(['Error in first notification']);
        expect(notification2.getMessagesNormalized()).toBe('customer: Error in first notification');
    });

    it('should get all errors props', () => {
        const notification = new Notification();
        const error1 = {
            message: 'First error message',
            context: 'customer',
        };
        const error2 = {
            message: 'Second error message',
            context: 'order',
        };
        notification.addError(error1);
        notification.addError(error2);

        const errorsProps = notification.errors;
        expect(errorsProps).toEqual([
            { message: 'First error message', context: 'customer' },
            { message: 'Second error message', context: 'order' },
        ]);
    });
});