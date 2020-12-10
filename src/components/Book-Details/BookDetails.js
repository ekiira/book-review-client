import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../../queries/queries";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#F7F4FF",
    borderRadius: "8px",
    padding: theme.spacing(2, 4, 3),
    width: "500px",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  modalLabel: {
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontSize: "14px",
    color: "#808495",
  },
  modalTextArea: {
    fontFamily: "Poppins",
    width: "100%",
    backgroundColor: "#F7F4FF",
    borderRadius: "5px",
    borderColor: "#C4C4C4",
    resize: "none",

    "&:focus": {
      borderColor: "#713EE5",
      outline: "none",
    },
    "&:hover": {
      borderColor: "#B39FDF",
    },
  },
  formControl: {
    marginTop: "10px",
  },
}));

const BookDetails = ({ id, openModal, modalClose }) => {
  const { loading, data } = useQuery(GET_BOOK, {
    variables: {
      id: id,
    },
  });

  const classes = useStyles()
  return (
    <Modal
    aria-labelledby="confirmation-modal-title"
    aria-describedby="confirmation-modal-description"
    className={classes.modal}
    open={openModal}
    onClose={modalClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={openModal}>
      <div className={classes.paper}>
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
  
        </div>
    </Fade>
  </Modal>


    );
};

export default BookDetails;
