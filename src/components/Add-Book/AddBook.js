import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../../queries/queries";

const AddBook = () => {
  const { loading: authorsLoading, data: authors } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK);

  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");

  const handleChange = (e, handler) => {
    handler(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: bookName,
        genre,
        authorId: author,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    });
  };

  return (
    <form onSubmit={handleSubmit} id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input
          value={bookName}
          onChange={(e) => handleChange(e, setBookName)}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input value={genre} onChange={(e) => handleChange(e, setGenre)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select value={author} onChange={(e) => handleChange(e, setAuthor)}>
          <option>Select Author</option>
          {authorsLoading ? (
            <option>Select Author</option>
          ) : (
            authors.authors.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))
          )}
        </select>
      </div>

      <button onClick={handleSubmit} type="submit">
        +
      </button>
    </form>
  );
};

export default AddBook;
