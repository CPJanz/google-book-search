//path isn't actually needed here.
//const path = require("path");
const router = require("express").Router();
// We require both of these so that we can bundle up both routes and can import the folder rather than each file
const bookRoutes = require("./books");
const googleRoutes = require("./google");

router.use("/books", bookRoutes);

router.use("/google", googleRoutes);

module.exports = router;
