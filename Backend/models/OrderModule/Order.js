
const OrderStatus = Object.freeze({
  InTransit: 'InTransit',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled'
});

class Order {
  constructor(trackingId, observers, orderDate) {
      this.trackingId = trackingId;
      this.observers = observers;  // List of observers
      this.orderDate = orderDate;
      this.status = OrderStatus.InTransit;  // default status
      this.orderDetails = [];
  }

  addObserver(observer) {
      this.observers.push(observer);
  }

  removeObserver(observer) {
      const index = this.observers.indexOf(observer);
      if (index > -1) {
          this.observers.splice(index, 1);
      }
  }

  calculateTotal() {
      // Placeholder logic to calculate total cost/price for the order
  }

  calculateTotalWeight() {
      // Placeholder logic to calculate the total weight of the items in the order
  }
}

module.export = Order;