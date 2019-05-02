// We require the Router method from express specifically in order to route our api calls
const router = require("express").Router();
// we're requiring the bookController so that we have access to it's methods
const bookController = require("../../controllers/bookController");

// We can combine get and post routes onto the same route. A get call will only hit the get method (and the post will only hit the post). This makes for compact readable code.
// We're accessing the entire db.
router
  .route("/")
  .get(bookController.findAll)
  .post(bookController.create);

// We're accessing specific entries here
router
  .route("/:id")
  .get(bookController.findById)
  .put(bookController.update)
  .delete(bookController.remove);

module.exports = router;
