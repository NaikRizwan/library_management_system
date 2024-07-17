import React, { useState } from "react";
import axios from "axios";

const AddBookForm = ({ refreshBooks }) => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    availabilityStatus: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/add", book);
      setBook({ name: "", author: "", availabilityStatus: true });
      refreshBooks();
    } catch (error) {
      console.error("There was an error adding the book!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <label htmlFor="bookName" className="form-label">
          Book Name
        </label>
        <input
          type="text"
          className="form-control"
          id="bookName"
          name="name"
          value={book.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bookAuthor" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          id="bookAuthor"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="availabilityStatus"
          name="availabilityStatus"
          checked={book.availabilityStatus}
          onChange={(e) =>
            setBook({ ...book, availabilityStatus: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="availabilityStatus">
          Available
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
