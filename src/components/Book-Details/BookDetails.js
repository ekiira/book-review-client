import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../../queries/queries";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { ModalLoader } from "../Loader/Loader";

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
  mainText: {
    fontSize: "20px",
    fontWeight: 700,
    textAlign: "center",
  },
  textBold: {
    fontWeight: 600,
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
  closeBtnW: {
    display: "flex",
    justifyContent: "flex-end",
  },
  closeBtn: {
    fontSize: "15px",
  },
}));

const BookDetails = ({ id, openModal, modalClose }) => {
  const { loading, data } = useQuery(GET_BOOK, {
    variables: {
      id: id,
    },
  });

  const classes = useStyles();
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
              <ModalLoader />
            ) : data ? (
              <div>
                <div className={classes.closeBtnW}>
                  <button className={classes.closeBtn} onClick={modalClose}>
                    X
                  </button>
                </div>
                <p className={classes.mainText}>{data.book.name}</p>
                <p>
                  <span className={classes.textBold}>Genre:</span>{" "}
                  {data.book.genre}
                </p>
                <p>
                  {" "}
                  <span className={classes.textBold}>Author:</span>{" "}
                  {data.book.author.name}
                </p>
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
