
//covering the basic code for displaying the routes

const express = require("express");
const userRoute = require("./routes/user.route");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3003;

app.use(bodyParser.json({ limit: "50kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50kb" }));

app.use(cors());
app.use("/api/v1/", userRoute);

require("./config/passport");

app.listen(process.env.PORT || 8080, () => {
  console.log("Backend node server running at port ", port);
});