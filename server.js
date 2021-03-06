require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// routes
app.use(require("./routes/api.js"));


// Create db connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
.then(conn => console.log(`Connected to ${conn.connections[0].host}.`))
.catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
