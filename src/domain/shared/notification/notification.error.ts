import { NotificationErrorProps } from "./notification";

export default class NotificationError extends Error {

    constructor(props: NotificationErrorProps[]) {
        const errors = props.map(p => `${p.context}: ${p.message}`).join(', ');
        super(errors);
    }
}
