import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../queries/queries";

const BookList = () => {
  const { loading, data } = useQuery(GET_BOOKS);
  console.log(data);
  console.log(loading);

  return (
    <div className="">
      BookList
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.books.map(({ name, id }) => (
            <li key={id}> {name} </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
