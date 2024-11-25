

// Enum for Order Status
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
    this.status = OrderStatus.InTransit;  // Default status
    this.orderDetails = [];  // List of OrderDetails
    this.transporter = null;  // The transporter assigned to this order (can be EV Truck or Drone)
  }

  // Notify all observers of status change
  notifyObservers() {
    this.observers.forEach(observer => {
      observer.updateStatus(this.status);
    });
  }

  // Update the order status and notify all observers
  updateStatus(newStatus) {
    this.status = newStatus;
    this.notifyObservers();  // Notify all observers about the status change
  }
  // Add an observer to the observers list
  addObserver(observer) {
    this.observers.push(observer);
  }

  // Remove an observer from the observers list
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  // Add order details to the order
  addOrderDetail(orderDetail) {
    this.orderDetails.push(orderDetail);
  }

  // Remove an order detail from the order
  removeOrderDetail(orderDetail) {
    const index = this.orderDetails.indexOf(orderDetail);
    if (index > -1) {
      this.orderDetails.splice(index, 1);
    }
  }

  // Method to assign a transporter to the order (EV Truck or Drone)
  assignTransporter(transporter) {
    this.transporter = transporter;
  }

  // Calculate the total cost for the order by summing the totals of each OrderDetail
  calculateTotal() {
    let totalCost = 0;

    // Iterate through each OrderDetail and sum the calculated totals
    this.orderDetails.forEach(orderDetail => {
      totalCost += orderDetail.getTotal();  // Call calculateTotal() of OrderDetail
    });

    // Add transport cost (battery usage, distance, etc.) if a transporter is assigned
    if (this.transporter) {
      totalCost += this.transporter.calculateTransportCost(this.calculateTotalWeight());  // Add transport cost
    }

    return totalCost;
  }

  // Calculate the total weight for the order (using OrderDetails' calcWeight)
  calculateTotalWeight() {
    let totalWeight = 0;
    this.orderDetails.forEach(orderDetail => {
      totalWeight += orderDetail.calcWeight(); // Add weight from OrderDetail
    });
    return totalWeight;
  }

  // Method to calculate ETA with respect to assigned transporter
  calculateETA() {
    if (!this.transporter) {
      console.log("No transporter assigned!");
      return null;
    }

    const destinationLatitude = 48.1351;  // Example: Destination latitude (e.g., Munich)
    const destinationLongitude = 11.5820; // Example: Destination longitude (e.g., Munich)
    const speed = 60;  // Assume average speed of 60 km/h for the transporter

    // Call transporter to calculate ETA
    return this.transporter.calculateETA(destinationLatitude, destinationLongitude, speed);
  }

  // Method to change the order status and notify observers
  updateStatus(newStatus) {
    this.status = newStatus;
    this.observers.forEach(observer => observer.updateStatus(newStatus));
  }
}

// Export the Order class
export default Order;