// AnalyticsService.js

import Observer from './IObserver.js';

class AnalyticsService extends Observer {
    constructor() {
        super();
    }

    updateStatus(status) {
        // Log the status change for analytics purposes
        console.log(`AnalyticsService: Order status changed to ${status}`);
    }
}

export default AnalyticsService;
