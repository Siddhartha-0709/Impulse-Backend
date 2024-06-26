import driverModel from "../models/driver.model.js";

const createDriver = async (req, res) => {
    const { name, email, password, phone, carNumber, currentLatitude, currentLongitude } = req.body;
    if (!name || !email || !password || !phone || !carNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const driver = await driverModel.findOne({ email });
        if (driver) {
            return res.status(400).json({ message: "Driver already exists" });
        }
        const newDriver = await driverModel.create({ name, email, password, phone, carNumber, currentLatitude, currentLongitude });
        res.status(201).json({ newDriver });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginDriver = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const driver = await driverModel.findOne({ email });
        if (!driver) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        if (password !== driver.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", driver });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

const sendLocation = async (req, res) => {
    const { latitude, longitude, email } = req.body;
    if (!latitude || !longitude || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const driver = await driverModel.findOneAndUpdate({email}, { currentLatitude: latitude, currentLongitude: longitude });
        if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.status(200).json({ message: "Location updated successfully", driver });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createDriver, loginDriver,sendLocation };
