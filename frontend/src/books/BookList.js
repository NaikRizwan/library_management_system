import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/book");
      setBooks(response.data);
    } catch (error) {
      console.error("There was an error fetching the books!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/book/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("There was an error deleting the book!", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="mt-5">
      <h2>Book List</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Availability Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.availabilityStatus ? "Available" : "Not Available"}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
