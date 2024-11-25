// NotificationSystem.js

import IObserver from './IObserver.js';

class NotificationSystem extends IObserver {
    constructor() {
        super();
    }

    updateStatus(status) {
        // Send a notification when the order status changes
        console.log(`NotificationSystem: Sending notification - Order status changed to ${status}`);
    }
}

export default NotificationSystem;