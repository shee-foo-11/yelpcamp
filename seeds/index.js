if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({
    accessToken: mapBoxToken
});
const mongoose = require('mongoose');
const cities = require('./cities');
const {
    places,
    descriptors
} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: "62cafd2f7dd923a4f422ceb6",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [{
                    url: 'https://res.cloudinary.com/d00d1e/image/upload/v1657585216/YelpCamp/ktdh5rgmdwybp68n05dd.avif',
                    filename: 'YelpCamp/ktdh5rgmdwybp68n05dd'
                },
                {
                    url: 'https://res.cloudinary.com/d00d1e/image/upload/v1657585217/YelpCamp/clciywpshfnsbpsphuyx.jpg',
                    filename: 'YelpCamp/clciywpshfnsbpsphuyx'
                },
                {
                    url: 'https://res.cloudinary.com/d00d1e/image/upload/v1657585216/YelpCamp/dryka8ojmod0y8jeow1b.avif',
                    filename: 'YelpCamp/dryka8ojmod0y8jeow1b'
                },
                {
                    url: 'https://res.cloudinary.com/d00d1e/image/upload/v1657585216/YelpCamp/tjdshlhyw8ki5bngxqcv.avif',
                    filename: 'YelpCamp/tjdshlhyw8ki5bngxqcv'
                },
                {
                    url: 'https://res.cloudinary.com/d00d1e/image/upload/v1657585216/YelpCamp/peuvicklu1msjholkaal.avif',
                    filename: 'YelpCamp/peuvicklu1msjholkaal'
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});