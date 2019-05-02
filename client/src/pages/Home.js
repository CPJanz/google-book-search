// Javascript page for the home page
// Importing react and component from react because this is a component
import React, { Component } from "react";
// Child components
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
// API calls
import API from "../utils/API";
// More components
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

//This is a class component (stateful)
class Home extends Component {
  state = {
    // Array of books to display. This is populated by an api call to the google books api
    books: [],
    // Query value. Populated by the book search form.
    q: "",
    // Message displayed in the results box while the books array is empty
    message: "Search For A Book To Begin!"
  };

  // Genericized that handles changes to input components and then update the state.
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // method that makes an api call to the google books api and sets the results to the books state variable or sets the message state variable telling the user that no books were found if none were.
  getBooks = () => {
    API.getBooks(this.state.q)
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      .catch(() =>
        this.setState({
          books: [],
          message: "No New Books Found, Try a Different Query"
        })
      );
  };

  //Method that is passed to children in order to trigger a getBooks api call on form submission
  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  };

  // Method that matches the passed id to a book in the books array and then adds that book to the favorite books db.
  handleBookSave = id => {
    const book = this.state.books.find(book => book.id === id);

    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getBooks());
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
          <Col size="md-12">
            <Card title="Book Search" icon="far fa-book">
              {/* Form for searching for books */}
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {/* component for displaying the results */}
            <Card title="Results">
              {/* Ternary block that is based on whether or not there are elements in the books array */}
              {this.state.books.length ? (
                <List>
                  {/* If so, show them all, this is done by mapping each element in the array to a Book component */}
                  {this.state.books.map(book => (
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      authors={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      // This button handles saving the book
                      Button={() => (
                        <button
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                // this is shown if no books are in the books array
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Home;
