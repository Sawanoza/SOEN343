

// Enum for Status
export const Status = Object.freeze({
    Transit: 'Transit',
    Charging: 'Charging',
    Ready: 'Ready'
});

export const Type = Object.freeze({
    EV_Truck: 'EV Truck',
    Drone: 'Drone'
});

class Transporter {
    constructor(transporterId, latitude, longitude, batteryLevel, transporterType, status, altitude = null) {
        this.transporterId = transporterId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.batteryLevel = batteryLevel;
        this.transporterType = transporterType;
        this.status = status;
        this.altitude = altitude;
    }

    // Method to update the current location of the transporter
    updateLocation(newLatitude, newLongitude, newAltitude = null) {
        this.latitude = newLatitude;
        this.longitude = newLongitude;
        if (newAltitude !== null) {
            this.altitude = newAltitude;  // Only for drones
        }
    }

    // Method to calculate the ETA based on distance and current speed
    calculateETA(destinationLatitude, destinationLongitude, speed) {
        // Haversine formula to calculate the distance between two geographical points
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = this.degreesToRadians(destinationLatitude - this.latitude);
        const dLon = this.degreesToRadians(destinationLongitude - this.longitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.degreesToRadians(this.latitude)) * Math.cos(this.degreesToRadians(destinationLatitude)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;  // Distance in kilometers

        // ETA = Distance / Speed
        const eta = distance / speed;  // ETA in hours

        return eta;
    }

    // Helper method to convert degrees to radians
    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Method to display the current transporter's details (for testing purposes)
    displayDetails() {
        console.log(`Transporter ID: ${this.transporterId}`);
        console.log(`Type: ${this.transporterType}`);
        console.log(`Status: ${this.status}`);
        console.log(`Location: ${this.latitude}, ${this.longitude}`);
        if (this.transporterType === Type.Drone) {
            console.log(`Altitude: ${this.altitude}`);
        }
        console.log(`Battery Level: ${this.batteryLevel}%`);
    }
}


export default Transporter;
