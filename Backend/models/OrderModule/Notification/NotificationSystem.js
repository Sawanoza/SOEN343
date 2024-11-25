// NotificationSystem.js

import Observer from './Observer.js';

class NotificationSystem extends Observer {
    constructor() {
        super();
    }

    updateStatus(status) {
        // Send a notification when the order status changes
        console.log(`NotificationSystem: Sending notification - Order status changed to ${status}`);
    }
}

export default NotificationSystem;