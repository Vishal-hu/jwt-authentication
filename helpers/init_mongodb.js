const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    })
    .then(() => {
        console.log("connection successful");
    })
    .catch(() => {
        console.log("Error in connection");
    });

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
    console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected to db");
});

process.on("SIGINT", async() => {
    await mongoose.connection.close();
    process.exit(0);
});