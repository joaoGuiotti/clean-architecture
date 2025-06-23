export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private readonly _errors = new Map<string, string[]>();

    getErrors(): NotificationErrorProps[] {
        return Array.from(this._errors.entries()).flatMap(([context, messages]) =>
            messages.map(message => ({ message, context }))
        );
    }

    addError(error: NotificationErrorProps): void {
        const { message, context } = error;
        if (!this._errors.has(context)) {
            this._errors.set(context, []);
        }
        this._errors.get(context)?.push(message);
    }

    hasErrors(): boolean {
        return this._errors.size > 0;
    }

    getMessages(context?: string): string[] {
        if (!context) {
            return Array.from(this._errors.values()).flat();
        }
        return this._errors.get(context) || [];
    }

    getMessagesNormalized(): string {
        return Array.from(this._errors.entries())
            .map(([context, messages]) => messages.map(msg => `${context}: ${msg}`).join(', '))
            .join(', ');
    }

    copyErrors(notification: Notification): void {
        if (!notification.hasErrors()) {
            return;
        }
        notification._errors.forEach((messages, context) => {
            messages.forEach(message => this.addError({ context, message }));
        });
    }
}