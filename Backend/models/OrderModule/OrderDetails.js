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
        // Placeholder logic to calculate total weight of items
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