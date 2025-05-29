require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const playRoutes = require("./Routes/playRoutes");



app.use(cors());
app.use(express.json());
app.use("/back", playRoutes);


const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});