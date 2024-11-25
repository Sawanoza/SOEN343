class OrderDetail {
    constructor(quality, dimensions, items, taxStatus) {
        this.quality = quality;
        this.dimensions = dimensions;
        this.items = items;  // List of items
        this.taxStatus = taxStatus;
    }

    calcTax() {
        // Placeholder logic to calculate tax for the order
    }

    calcWeight() {
        let weight = 0;
        this.items.forEach(item => {
            weight += item.shippingWeight; // Add up the shipping weight of each item
        });
        return weight * 2; // Example logic: weight-based shipping cost (e.g., $2 per kg)
    }

    // Method to calculate the total for this order detail
    getTotal() {
        let total = 0;

        // Add price of each item in the order detail
        this.items.forEach(item => {
            total += item.getPriceForQuantity(1);  // Example: Get price for 1 quantity
        });

        // Add tax and shipping cost (calculated in other methods)
        total += this.calcTax();
        total += this.calcWeight();

        return total;
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
}

module.export = OrderDetail;