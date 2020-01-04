const express = require("express");
//const user = require("./routes/user");
//const auth = require("./routes/auth");
const restaurant = require("./routes/restaurant");
const connectDB = require("./config/db");

const app = express();

connectDB();
//init middleware (bodyparser)
app.use(express.json({ extended: false }));

//define routes
//app.use(auth);
//app.use(user);
app.use(restaurant);

app.get("/", (req, res) => {
  res.send("hello");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("restaurant server has started on " + port);
});
