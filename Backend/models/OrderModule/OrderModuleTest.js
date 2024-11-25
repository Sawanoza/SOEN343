// Import classes and enums
import Transporter, { Type, Status } from './Transporter.js';
import Item from './Item.js';
const OrderDetail = require('./OrderDetails.js');
import NotificationSystem from './Notification/NotificationSystem.js';
import UserInterface from './Notification/UserInterface.js';
import AnalyticsService from './Notification/AnalyticsService.js';
import Order from './Order.js';
import { Location, Warehouse } from './Location.js';

function main() {
    // Step 1: Create items
    const item1 = new Item('Laptop', 'High-performance laptop', 'IT001', 2.5, true);
    const item2 = new Item('Smartphone', 'Latest smartphone', 'IT002', 0.3, true);

    // Set prices (not in constructor but assumed in class)
    item1.price = 1200;
    item2.price = 800;

    // Step 2: Create OrderDetails with items
    const orderDetail = new OrderDetail(5, '30x20x10', [item1, item2], 'Taxable');

    // Step 3: Create and assign observers
    const notificationSystem = new NotificationSystem();
    const userInterface = new UserInterface();
    const analyticsService = new AnalyticsService();

    // Step 4: Create and assign a transporter
    const transporter = new Transporter(
        'T001',          // Transporter ID
        34.0522,         // Starting latitude (e.g., Los Angeles)
        -118.2437,       // Starting longitude (e.g., Los Angeles)
        85,              // Battery level (%)
        Type.EV_Truck,   // Type: EV Truck
        Status.Ready     // Status
    );

    // Step 5: Create a warehouse and location
    const warehouseLocation = new Location('123 Main St', 'USA', 'Los Angeles');
    const warehouse = new Warehouse('9 AM - 6 PM', warehouseLocation);

    // Step 6: Create an order and assign details and transporter
    const order = new Order('ORD1234', [notificationSystem, userInterface, analyticsService], new Date());
    order.addOrderDetail(orderDetail);
    order.assignTransporter(transporter);

    // Step 7: Display initial order and transporter details
    console.log('--- Initial Order Details ---');
    transporter.displayDetails();
    console.log(`Order Total: $${order.calculateTotal().toFixed(2)}`);
    console.log(`Order Total Weight: ${order.calculateTotalWeight()} kg`);

    // Step 8: Update transporter location and calculate ETA
    console.log('\n--- Updating Transporter Location ---');
    transporter.updateLocation(40.7128, -74.0060); // New location: New York City
    transporter.displayDetails();
    const eta = transporter.calculateETA(40.7128, -74.0060, 60); // Destination: New York City, Speed: 60 km/h
    console.log(`Estimated Time of Arrival (ETA): ${eta.toFixed(2)} hours`);

    // Step 9: Change order status and notify observers
    console.log('\n--- Updating Order Status ---');
    order.updateStatus('InTransit'); // Notify observers
    order.updateStatus('Delivered'); // Notify observers

    // Step 10: Final Output
    console.log('\n--- Final Order Status ---');
    console.log(`Order Status: ${order.status}`);
}

main();
