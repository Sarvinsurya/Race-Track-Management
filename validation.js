class GeekRacers {
    constructor() {
        this.regularTrack = { type: "REGULAR", maxVehicles: 4, costPerHourBike: 60, costPerHourCar: 120, costPerHourSUV: 200, bookedVehicles: 0 };
        this.vipTrack = { type: "VIP", maxVehicles: 2, costPerHourCar: 250, costPerHourSUV: 300, bookedVehicles: 0 };
        this.bookings = [];
    }

    processBooking(command) {
        const parts = command.split(" ");
        const vehicleType = parts[0];
        const startTime = parseInt(parts[1]);
        const duration = parseInt(parts[2]);

        if (startTime < 1300 || startTime + duration > 1700) {
            console.log(`Invalid booking: Experience must be completed between 1 PM and 5 PM.`);
            return;
        }

        let trackType = "REGULAR";
        let costPerHour;

        if (trackType === "REGULAR") {
            if (vehicleType === "BIKE") {
                costPerHour = this.regularTrack.costPerHourBike;
            } else if (vehicleType === "CAR") {
                costPerHour = this.regularTrack.costPerHourCar;
            } else if (vehicleType === "SUV") {
                costPerHour = this.regularTrack.costPerHourSUV;
            }
        } else if (trackType === "VIP") {
            if (vehicleType === "CAR") {
                costPerHour = this.vipTrack.costPerHourCar;
            } else if (vehicleType === "SUV") {
                costPerHour = this.vipTrack.costPerHourSUV;
            }
        }

        if ((vehicleType === "CAR" || vehicleType === "SUV") && this.regularTrack.bookedVehicles >= this.regularTrack.maxVehicles) {
            trackType = "VIP"; 
        }

        const adjustedDuration = Math.max(duration, 180);
        const extraTime = adjustedDuration - 180;
        const totalHours = Math.ceil(adjustedDuration / 60); 
        const totalCost = costPerHour * totalHours;
        const extraCost = extraTime > 15 ? (totalHours - 3) * 50 : 0;

        if (trackType === "REGULAR") {
            this.regularTrack.bookedVehicles++;
        } else {
            this.vipTrack.bookedVehicles++;
        }

        this.bookings.push({ vehicleType, trackType, startTime, duration, adjustedDuration, totalCost, extraCost });
    }

    calculateRevenue(track) {
        let revenue = 0;
        for (const booking of this.bookings) {
            if (booking.trackType === track.type) {
                revenue += booking.totalCost + booking.extraCost;
            }
        }
        return revenue;
    }
}

module.exports = GeekRacers;
