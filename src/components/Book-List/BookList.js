import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../queries/queries";
import BookDetails from "../Book-Details/BookDetails";
import TablePagination from "@material-ui/core/TablePagination";

import styles from "./bookList.module.scss";
import '../custom.scss'
const BookList = () => {
  const { loading, data } = useQuery(GET_BOOKS);
  const [id, setId] = useState("");
  const handleClick = (id) => {
    setId(id);
  };

  const [page, setPage] = React.useState(1);

  const itemsPerPage = 10;
  const indexofLastPost = page * itemsPerPage;
  const indexofFirstPost = indexofLastPost - itemsPerPage;
  const currentPost = data
    ? data.books.slice(indexofFirstPost, indexofLastPost)
    : null;
  const [pn, setPn] = useState("");

  const handlePageChange = (event, value) => {
    if (value > 0 && value <= pn) {
      setPage(value);
    }
  };

  useEffect(() => {
    if (data) {
      for (let i = 1; i <= Math.ceil(data.books.length / itemsPerPage); i++) {
        setPn(i);
      }
    }
  }, [data]);

  console.log('data', data)
  return (
    <div className={styles.books}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.books_list}>
          {currentPost.map(({ name, id, image }) => (
            <li
              key={id}
              onClick={() => handleClick(id)}
              className={styles.books_single}
            >
              <img src={image} alt="book" className={styles.books_image}/>
              
              <span className={styles.books_name}>
                {name}
              </span>
            </li>
          ))}
        </ul>
      )}
      {/* <BookDetails 
        id={id}
        /> */}
      <div className={styles.paginationWrapper}>
        {/* <TablePagination
          component="div"
          count={Number(pn)}
          page={page}
          onChangePage={handlePageChange}
          rowsPerPageOptions={[]}
          nextIconButtonProps={{
            disableFocusRipple: true,
            disableRipple: true,
          }}
          backIconButtonProps={{
            disableFocusRipple: true,
            disableRipple: true,
          }}
        /> */}
      </div>
    </div>
  );
};

export default BookList;
