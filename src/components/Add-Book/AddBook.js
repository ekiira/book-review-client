import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../../queries/queries";

import { useForm, Controller } from "react-hook-form";

import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";
import styles from "./addBook.module.scss";
import { Load } from "../Loader/Loader";

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
  }),
};

const AddBook = ({ setAddBook }) => {
  const { register, handleSubmit, control } = useForm();

  const { loading: authorsLoading, data: authors } = useQuery(GET_AUTHORS);

  const [addBook] = useMutation(ADD_BOOK);

  const onFormSubmit = (data) => {
    console.log(data);
    addBook({
      variables: {
        name: data.name,
        genre: data.genre,
        authorId: data.authorId.value,
        image: data.image,
      },
      awaitRefetchQueries: true,
      refetchQueries: [{ query: GET_BOOKS }],
    });
    setAddBook(false);
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
                <InputBase
                  fullWidth
                  inputRef={register({ required: true })}
                  name="genre"
                  className={styles.inputContainer}
                />
              </div>

              <div className="field">
                <InputLabel className={styles.inputLabel}>
                  Image <span className={styles.asterik}>*</span>
                </InputLabel>
                <InputBase
                  fullWidth
                  inputRef={register({ required: true })}
                  name="image"
                  className={styles.inputContainer}
                />
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
