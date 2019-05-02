// Javascript file handling the saved page
import React, { Component } from "react";
// Child components
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

// This is a class component (stateful)
class Saved extends Component {
  state = {
    // The books array holds the saved books and is populated by calls to the db.
    books: []
  };

  // Called right before the render method is called for the first time for this component. It runs the getSavedBooks method which hits the db for savedbooks
  componentDidMount() {
    this.getSavedBooks();
  }

  // Api call method which hits the db for saved books
  getSavedBooks = () => {
    API.getSavedBooks()
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      .catch(err => console.log(err));
  };

  // Api call which hits the db, deleting a saved book
  handleBookDelete = id => {
    API.deleteBook(id).then(res => this.getSavedBooks());
  };

  // Renders the page
  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center">
                Search for and Save Books of Interest.
              </h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Books" icon="download">
              {/* Ternary block based off of whether or not the books array has any elements. if it does it displays each in a book component */}
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book._id}
                      title={book.title}
                      subtitle={book.subtitle}
                      link={book.link}
                      authors={book.authors.join(", ")}
                      description={book.description}
                      image={book.image}
                      // This button calls the delete saved book api method
                      Button={() => (
                        <button
                          onClick={() => this.handleBookDelete(book._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                // Message is displayed if the user has no saved books
                <h2 className="text-center">No Saved Books</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
