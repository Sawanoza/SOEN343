class Location {
    constructor(address, country, city) {
        this.address = address;
        this.country = country;
        this.city = city;
    }
}

class Warehouse {
    constructor(hours, location) {
        this.hours = hours;
        this.location = location;  // Instance of Location
    }
}
