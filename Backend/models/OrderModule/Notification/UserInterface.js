// UserInterface.js

import Observer from './Observer.js';

class UserInterface extends Observer {
    constructor() {
        super();
    }

    updateStatus(status) {
        // Update the user interface (UI) when the order status changes
        console.log(`UserInterface: Updating UI - Order status changed to ${status}`);
    }
}

export default UserInterface;