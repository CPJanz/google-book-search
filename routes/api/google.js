const router = require("express").Router();
const googleController = require("../../controllers/googleController");

// This router is pointed to the googleController which hits the google api.
router.route("/").get(googleController.findAll);

module.exports = router;
