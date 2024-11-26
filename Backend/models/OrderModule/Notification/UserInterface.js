// UserInterface.js

const IObserver = require( './IObserver.js');

class UserInterface extends IObserver {
    constructor() {
        super();
    }

    updateStatus(status) {
        // Update the user interface (UI) when the order status changes
        console.log(`UserInterface: Updating UI - Order status changed to ${status}`);
    }
}

module.exports = UserInterface;