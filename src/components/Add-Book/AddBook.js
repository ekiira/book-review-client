import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../../queries/queries";

import { useForm, Controller } from "react-hook-form";

import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";
import styles from "./addBook.module.scss";
import { Load } from "../Loader/Loader";
import { popWarningAlert } from "../Alert/notification";

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// cloudinary details
const url = process.env.REACT_APP_CLOUDINARY_URL;
const preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected
      ? "#333333"
      : state.isFocused
      ? "#333333"
      : "#333333",
    backgroundColor: state.isFocused ? "#cec3c3" : "white",
    padding: 20,
  }),
  control: (base, state) => ({
    ...base,
    borderRadius: state.isFocused ? "5px" : "5px",
    padding: "9px",
    fontSize: "16px",
    marginBottom: "20px",
  }),
};

const genre = [
  { value: "Fiction", label: "Fiction" },
  { value: "Mystery", label: "Mystery" },
  { value: "Adventure", label: "Adventure" },
  { value: "Horror", label: "Horror" },
  { value: "Thriller", label: "Thriller" },
  { value: "Comedy", label: "Comedy" },
  { value: "Romance", label: "Romance" },
];

const AddBook = ({ setAddBook }) => {
  const { register, handleSubmit, control } = useForm();
  const [image, setImage] = useState("");
  const { loading: authorsLoading, data: authors } = useQuery(GET_AUTHORS);

  const [addBook] = useMutation(ADD_BOOK);

  const onFileChange = (e) => {
    // CLOUDINARY UPLOAD
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    axios
      .post(url, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((formDatum) => {
        setImage(formDatum.data.url);
      })
      .catch((error) => {
        return error;
      });
  };

  const onFormSubmit = (data) => {
    const newData = { ...data, image };

    switch (true) {
      case !newData.name:
        popWarningAlert("Please enter a name");
        break;
      case !newData.genre.value:
        popWarningAlert("Please select a genre");
        break;
      case !newData.image:
        popWarningAlert("Please choose a photo");
        break;
      case !newData.authorId:
        popWarningAlert("Please select an author");
        break;
      default:
        addBook({
          variables: {
            name: newData.name,
            genre: newData.genre.value,
            authorId: newData.authorId.value,
            image: newData.image,
          },
          awaitRefetchQueries: true,
          refetchQueries: [{ query: GET_BOOKS }],
        });
        setAddBook(false);
        break;
    }
  };

  const onDiscard = () => {
    setAddBook(false);
  };

  return (
    <div>
      <div className={styles.addBookWrapper}>
        {!authorsLoading ? (
          <div>
            <h3>Add a Book</h3>
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className={styles.addBook}
            >
              <div className="field">
                <InputLabel className={styles.inputLabel}>
                  Book name <span className={styles.asterik}>*</span>
                </InputLabel>
                <InputBase
                  fullWidth
                  name="name"
                  inputRef={register({ required: true })}
                  className={styles.inputContainer}
                />
              </div>

              <div className="field">
                <InputLabel className={styles.inputLabel}>
                  Genre <span className={styles.asterik}>*</span>
                </InputLabel>
                <Controller
                  as={
                    <Select
                      name="genre"
                      options={genre}
                      styles={customStyles}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      placeholder=""
                    />
                  }
                  name="genre"
                  control={control}
                  inputRef={register({ required: true })}
                  defaultValue=""
                />
              </div>

              <div className="field">
                <InputLabel className={styles.inputLabel}>
                  Image <span className={styles.asterik}>*</span>
                </InputLabel>
                <div className={styles.file}>
                  <input
                    id="passport"
                    type="file"
                    name="image"
                    onChange={onFileChange}
                    accept="image/png, image/jpeg"
                    className={styles.inputFile}
                  />
                  <span className={styles.abb}>
                    {image ? image : "No photo Chosen"}
                  </span>
                </div>
              </div>

              <div className="field">
                <InputLabel className={styles.inputLabel}>
                  Author <span className={styles.asterik}>*</span>
                </InputLabel>
                <Controller
                  as={
                    <Select
                      name="authorId"
                      options={authors.authors.map(({ name, id }) => {
                        return {
                          value: id,
                          label: name,
                        };
                      })}
                      styles={customStyles}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      placeholder=""
                    />
                  }
                  name="authorId"
                  control={control}
                  inputRef={register({ required: true })}
                  defaultValue=""
                />
              </div>
              <div>
                <p>
                  Please note that all fields marked with an asterisk (*) are
                  compulsory
                </p>
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  className={`${styles.button} ${styles.discardButton}`}
                  onClick={onDiscard}
                  type="button"
                >
                  Discard
                </button>
                <button
                  onClick={handleSubmit}
                  className={styles.button}
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        ) : (
          <Load />
        )}
      </div>
    </div>
  );
};

export default AddBook;
