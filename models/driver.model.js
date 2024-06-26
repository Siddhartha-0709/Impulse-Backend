import mongoose from "mongoose";
const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    carNumber: {
        type: String,
        required: true,
    },
    currentLatitude: {
        type: Number,
        default: 0
    },
    currentLongitude: {
        type: Number,
        default: 0
    },
    upcomingRide: {
        destination:{
            latitude: Number,
            longitude: Number
        },
        time: Date
    }
},{timestamps: true});

export default mongoose.model("Driver", driverSchema)