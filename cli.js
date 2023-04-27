#!/usr/bin/env node
import minimist from "minimist"
import moment from "moment-timezone" 
import fetch from "node-fetch"
//argument 
const args = minimist(process.argv.slice(2)); 
//help text section 
if(args.h) {
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE"); 
    console.log("-h            Show this help message and exit."); 
    console.log(" -n, -s        Latitude: N positive; S negative."); 
    console.log(" -e, -w        Longitude: E positive; W negative."); 
    console.log("-z            Time zone: uses tz.guess() from moment-timezone by default."); 
    console.log(" -d 0-6        Day to retrieve weather: 0 is today; defaults to 1."); 
    console.log(" -j            Echo pretty JSON from open-meteo API and exit.");
    process.exit(0);  
}
//initializing variables, setting default values 
let latitude = 0; 
let longitude = 0; 
//setting latitude values 
if (args.s) { 
    latitude = -args.s 
} else if (args.n) { 
    latitude = args.n 
} else { 
    console.log("latitude must be in range")
}
//setting longitude values 
if (args.w) { 
    latitude = -args.w 
} else if (args.e) { 
    latitude = args.e
} else { 
    console.log("longitude must be in range")
}
//timezone value 
let timezone = moment.tz.guess(); 
if(args.z) { 
    timezone = args.z
}
//setting the value of the day that needs to be looked up 
let day = 1 
if(args.d) {
    day = args.d; 
}
//fetch 
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&timezone=' + timezone); 
const data = await response.json();
//day
if (day == 0) { 
    console.log(" today.")
} else if (day > 1) { 
    console.log(" in " + day + " days.")
} else { 
    console.log(" tomorrow.")
}
//if galoshes are needed 
if(data.daily.precipitation_hours[day] > 0) { 
    console.log("You might need your galoshes")
} else { 
    console.log("You will not need your galoshes")
}
//exit 
    if (args.j) { 
        console.log(data); 
        process.exit(0); 
    }