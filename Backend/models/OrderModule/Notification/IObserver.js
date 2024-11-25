// Observer.js

class IObserver {
    updateStatus(status) {
        throw "updateStatus() method should be implemented in subclasses.";
    }
}

module.exports = IObserver;