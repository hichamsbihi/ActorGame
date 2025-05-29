require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const playRoutes = require("./routes/playRoutes");



app.use(cors());
app.use(express.json());
app.use("api/game/play", playRoutes);


const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});