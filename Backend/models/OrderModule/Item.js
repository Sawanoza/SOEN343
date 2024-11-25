class Item {
    constructor(name, description, itemNumber, shippingWeight, inStock) {
        this.name = name;
        this.description = description;
        this.itemNumber = itemNumber;
        this.shippingWeight = shippingWeight;
        this.inStock = inStock;
    }

    getTax() {
        return this.price * 0.15; // 15% tax rate
    }

    getPriceForQuantity(quantity) {
        return this.price * quantity;  // Multiply price by quantity
    }

    inStock() {
        return this.inStock;
    }
}
