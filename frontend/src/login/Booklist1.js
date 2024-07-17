import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BookList1 = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/book");
      setBooks(response.data);
    } catch (error) {
      console.error("There was an error fetching the books!", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="mt-5 container">
      <h2>Book List</h2>
      {books.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Availability Status</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>
                  {book.availabilityStatus ? "Available" : "Not Available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info mt-4">
          No books are present in the library.
        </div>
      )}
    </div>
  );
};

export default BookList1;
