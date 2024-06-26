import connectDB from "./db/index.js";
import app from "./app.js";
connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
        console.log('Server started on port 5000');
    })
}).catch((err) => {
    console.log(err);
})