const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const mongoose = require("mongoose");



//env config
require("dotenv").config();


//router import
const todoRoutes = require("./routes/Route");



//rest objecct
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`Connected to mongoDB Database ${mongoose.connection.host}`.bgMagenta);
    })
    .catch((err) => {
        console.log(err.message);
    });
app.use("/api/v1/todos", todoRoutes);




// Port
const PORT = process.env.PORT || 8055;
//listen
const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
            .white
    );
});