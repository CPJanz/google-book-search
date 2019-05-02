// We require axios because we're hitting an external api
const axios = require("axios");
/// We require the models folder because we're filtering the saved books out of the searched book return
const db = require("../models");
// Handles communication between the api file and the google api.

module.exports = {
  // Hits the google api and does a query based on our search term
  findAll: function(req, res) {
    const { query: params } = req;
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params
      })
      // Filters out results which don't have complete information
      .then(results =>
        results.data.items.filter(
          result =>
            result.volumeInfo.title &&
            result.volumeInfo.infoLink &&
            result.volumeInfo.authors &&
            result.volumeInfo.description &&
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.thumbnail
        )
      )
      // Hits the books collection and filters out the books which are already saved in our db (since we don't want to show saved books on our search page)
      .then(apiBooks =>
        db.Book.find().then(dbBooks =>
          apiBooks.filter(apiBook =>
            dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id)
          )
        )
      )
      // Return our filtered results as a json file
      .then(books => res.json(books))
      .catch(err => res.status(422).json(err));
  }
};
