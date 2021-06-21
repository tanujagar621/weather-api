const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const weatherRoute = require("./routes/weather");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", weatherRoute);
app.use(express.static("public"));

app.listen(port, () => console.log(`we are live at port ${port}`));
