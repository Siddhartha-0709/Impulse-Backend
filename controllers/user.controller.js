import driverModel from "../models/driver.model.js";
import userModel from "../models/user.model.js";

const createUser = async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await userModel.create({ name, email, password, phone });
        res.status(201).json({ newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findDriverNear = async (req, res) => {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const drivers = await driverModel.find({
            currentLatitude: {
                $lte: latitude + 1.01,
                $gte: latitude - 1.01
            },
            currentLongitude: {
                $lte: longitude + 1.01,
                $gte: longitude - 1.01
            }
        }); 
        res.status(200).json({ drivers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const requestDriver = async (req, res) => {
    const { email, latitude, longitude } = req.body;
    if (!email || !latitude || !longitude) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const driver = await driverModel.findOne({ email });
        if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        driver.upcomingRide.destination.latitude = latitude;
        driver.upcomingRide.destination.longitude = longitude;
        await driver.save();
        res.status(200).json({ message: "Driver location updated", driver });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { createUser, loginUser, findDriverNear, requestDriver };