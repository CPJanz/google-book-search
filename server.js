//This project is using both express and mongo so we need to import them
const express = require("express");
const mongoose = require("mongoose");
// Here we import the routes (specifically the index.js file in the routes file which has all our routes bundled)
const routes = require("./routes");
// We create an instance of an express object
const app = express();
// We set our port to 3001 in development and use whatever the process.env.PORT value is if we're in production
const PORT = process.env.PORT || 3001;

// Middleware used for communicating with the client
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If we're in production, the client will use the compiled version
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// set our app to use the routes we've created
app.use(routes);

// If we're in production, use the production mongo database otherwise use the localhost db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {
  useCreateIndex: true,
  useNewUrlParser: true
});

// Begin listening!
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
