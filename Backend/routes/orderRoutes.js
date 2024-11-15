// routes/orderRoutes.js
const express = require('express');
const { Order, OrderDetail, Item } = require('../models/order');  // Import models

const router = express.Router();

// Route to create a new order with order details and items
router.post('/', async (req, res) => {
  const { trackingID, date, orderDetails } = req.body; // orderDetails is an array of order detail objects

  try {
    // Create the order
    const newOrder = await Order.create({
      trackingID,
      date
    });

    // Iterate over the orderDetails and create each one
    for (let detail of orderDetails) {
      const newOrderDetail = await OrderDetail.create({
        quantity: detail.quantity,
        dimensions: detail.dimensions,
        taxStatus: detail.taxStatus,
        orderId: newOrder.id  // Foreign key linking to the order
      });

      // Create items for each order detail
      for (let item of detail.items) {
        await Item.create({
          name: item.name,
          description: item.description,
          itemNumber: item.itemNumber,
          shippingWeight: item.shippingWeight,
          orderDetailId: newOrderDetail.id  // Foreign key linking to the order detail
        });
      }
    }

    res.status(201).json({ message: 'Order created with order details and items' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create order' });
  }
});

// Route to get all orders with associated details and items
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: OrderDetail,
        include: Item  // Include items within each order detail
      }
    });
    res.json(orders);  // Return all orders with order details and items
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch orders' });
  }
});

// Route to get a specific order by tracking ID with associated details and items
router.get('/:trackingID', async (req, res) => {
  const { trackingID } = req.params;

  try {
    const order = await Order.findOne({
      where: { trackingID },
      include: {
        model: OrderDetail,
        include: Item  // Include items within each order detail
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);  // Return the found order with details and items
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch the order' });
  }
});

// Route to update an order's details
router.put('/:trackingID', async (req, res) => {
  const { trackingID } = req.params;
  const { date, orderDetails } = req.body;

  try {
    const order = await Order.findOne({ where: { trackingID } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order's date
    order.date = date || order.date;
    await order.save();

    // Update order details
    for (let detail of orderDetails) {
      let orderDetail = await OrderDetail.findByPk(detail.id);

      if (orderDetail) {
        orderDetail.quantity = detail.quantity || orderDetail.quantity;
        orderDetail.dimensions = detail.dimensions || orderDetail.dimensions;
        orderDetail.taxStatus = detail.taxStatus || orderDetail.taxStatus;
        await orderDetail.save();

        // Update items for each order detail
        for (let item of detail.items) {
          let itemRecord = await Item.findByPk(item.id);

          if (itemRecord) {
            itemRecord.name = item.name || itemRecord.name;
            itemRecord.description = item.description || itemRecord.description;
            itemRecord.itemNumber = item.itemNumber || itemRecord.itemNumber;
            itemRecord.shippingWeight = item.shippingWeight || itemRecord.shippingWeight;
            await itemRecord.save();
          }
        }
      }
    }

    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update order' });
  }
});

// Route to delete an order by tracking ID
router.delete('/:trackingID', async (req, res) => {
  const { trackingID } = req.params;

  try {
    const order = await Order.findOne({ where: { trackingID } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Delete related order details and items first (to avoid foreign key constraint errors)
    const orderDetails = await OrderDetail.findAll({ where: { orderId: order.id } });

    for (let detail of orderDetails) {
      const items = await Item.findAll({ where: { orderDetailId: detail.id } });
      await Promise.all(items.map(item => item.destroy()));
      await detail.destroy();
    }

    // Finally, delete the order
    await order.destroy();

    res.status(200).json({ message: 'Order and associated details deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete order' });
  }
});

module.exports = router;
