import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../queries/queries";
import BookDetails from "../Book-Details/BookDetails";

const BookList = () => {
  const { loading, data } = useQuery(GET_BOOKS);
  const [id, setId] = useState('')
const handleClick = (id) => {
  setId(id)
}
  return (
    <div className="">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul id="book-list">
          {data.books.map(({ name, id }) => (
            <li key={id} onClick={() => handleClick(id)}> {name} </li>
          ))}
        </ul>
      )}
        <BookDetails 
        id={id}
        />

    </div>
  );
};

export default BookList;
