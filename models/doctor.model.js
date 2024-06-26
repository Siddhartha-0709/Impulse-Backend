import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
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
    qualification: {
        type: String,
        required: true,
    },
    registrationNumber:{
        type: String,
        required: true,
    },
    availableTime: {
        type: String,
        required: true
    }
},{timestamps: true});