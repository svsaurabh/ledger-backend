const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./connectDB");
require("dotenv").config();

// Establish DB connection
connectDB();

const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "*" }));
app.use(express.json({ extended: false }));

app.use("/api", require("./routes"));
app.get("/test", (req, res) => {
    res.status(200).send({ message: "test" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
