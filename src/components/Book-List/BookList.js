import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../queries/queries";
import BookDetails from "../Book-Details/BookDetails";
import TablePagination from "@material-ui/core/TablePagination";
import Grid from "@material-ui/core/Grid";
import styles from "./bookList.module.scss";
import "../custom.scss";
const BookList = () => {
  const { loading, data } = useQuery(GET_BOOKS);
  const [id, setId] = useState("");
  const handleClick = (id) => {
    setId(id);
  };

  const [page, setPage] = React.useState(1);

  const itemsPerPage = 3;
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

  return (
    <div className={styles.books}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
        <div className={styles.paginationWrapper}>
        <TablePagination
          component="div"
          count={Number(pn)}
          page={page}
          onChangePage={handlePageChange}
          rowsPerPage={0}
          rowsPerPageOptions={[]}
          nextIconButtonProps={{
            disableFocusRipple: true,
            disableRipple: true,
          }}
          backIconButtonProps={{
            disableFocusRipple: true,
            disableRipple: true,
          }}
        />
      </div>
        <Grid container spacing={2} className={styles.books_list}>
          {currentPost.map(({ name, id, image, author }) => (
            <Grid item xs={12} lg={4} key={id}>
              <div
                onClick={() => handleClick(id)}
                className={styles.books_single}
              >
                <div className={styles.books_single_overlay}> </div>

                <img src={image} alt="book" className={styles.books_image} />
                <span className={styles.books_name}>{name}</span>

                <span className={styles.books_author}>{author.name}</span>
              </div>
            </Grid>
          ))}
        </Grid>
        </div>
      )}
      {/* <BookDetails 
        id={id}
        /> */}
 
    </div>
  );
};

export default BookList;
