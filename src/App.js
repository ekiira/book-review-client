import React from "react";
import "./App.scss";
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
      <div className="main-wrapper">
      <div>

      <h1 className="title">
       Jay's Reading List
       </h1>
 
       <div className="main">
       
        <BookList />
        {/* <AddBook /> */}
       </div>
      </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
