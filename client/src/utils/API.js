// An api that we created that handles client to server communication.
import axios from "axios";

export default {
  // This will hit the google books api and return with search results
  getBooks: function(q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  // This will hit the db and return with all fo the saved books
  getSavedBooks: function() {
    return axios.get("/api/books");
  },
  // This will hit the db and delete a saved book
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // this will hit the db and add a saved book
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
