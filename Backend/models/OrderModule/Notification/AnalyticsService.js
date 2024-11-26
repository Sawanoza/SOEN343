// AnalyticsService.js

const IObserver = require( './IObserver.js');

class AnalyticsService extends IObserver {
    constructor() {
        super();
    }

    updateStatus(status) {
        // Log the status change for analytics purposes
        console.log(`AnalyticsService: Order status changed to ${status}`);
    }
}

module.exports = AnalyticsService;
