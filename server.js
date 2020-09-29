const express = require("express");
const connectDb = require("./config/db");

const app = express();

connectDb();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Pozdrav iz zemlje Safari"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/buildings", require("./routes/api/buildings"));
app.use("/api/measures", require("./routes/api/measures"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started ${PORT}`));
