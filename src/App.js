import React, { useState } from "react";
import "./App.scss";
import BookList from "./components/Book-List/BookList";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AddBook from "./components/Add-Book/AddBook";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

// apollo client setup
const client = new ApolloClient({
  uri: "https://reading-list-server.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const [addBook, setAddBook] = useState(false);

  const onAddClick = () => {
    setAddBook(true);
  };
  return (
    <ApolloProvider client={client}>
      <div className="main-wrapper">
        <div>
          <h1 className="title">Jay's Reading List</h1>

          <div className="main">
            {addBook ? <AddBook setAddBook={setAddBook} /> : <BookList />}
          </div>
        </div>
        {addBook ? null : (
          <div className="add">
            <Fab color="inherit" aria-label="add" onClick={onAddClick}>
              <AddIcon />
            </Fab>
          </div>
        )}
      </div>
    </ApolloProvider>
  );
};

export default App;
