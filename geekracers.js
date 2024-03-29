const fs = require("fs");
const GeekRacers = require("./validation");

const filename = process.argv[2];

fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw err;
    const inputLines = data.toString().split("\n");
    const geekRacers = new GeekRacers();

    inputLines.forEach(command => {
        if (command.trim() !== "") {
            geekRacers.processBooking(command.trim());
        }
    });

    const regularRevenue = geekRacers.calculateRevenue(geekRacers.regularTrack);
    const vipRevenue = geekRacers.calculateRevenue(geekRacers.vipTrack);
    console.log(`Total Revenue for Regular Track: ₹${regularRevenue}`);
    console.log(`Total Revenue for VIP Track: ₹${vipRevenue}`);
});
