import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../../queries/queries";

const BookDetails = ({ id }) => {
  const { loading, data } = useQuery(GET_BOOK, {
    variables: {
      id: id,
    },
  });
  return (
    <div className="" id="book-details">
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div >
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All books by the author:</p>
          <ul className="other-books">
            {data.book.author.books.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No book selected...</div>
      )}
    </div>
  );
};

export default BookDetails;
