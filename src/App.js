import React from "react";
import "./App.css";
import BookList from "./components/Book-List/BookList";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AddBook from "./components/Add-Book/AddBook";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        Jay's Reading List
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;
