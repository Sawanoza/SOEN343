const Location = class {
    constructor(address, country, city) {
        this.address = address;
        this.country = country;
        this.city = city;
    }
};

const Warehouse = class {
    constructor(hours, location) {
        this.hours = hours;
        this.location = location;
    }
};

module.exports = { Location, Warehouse };
