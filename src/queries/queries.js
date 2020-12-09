import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  {
    books {
      name
      id
      image
      author {
        id
        name
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const GET_BOOK = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!, $image: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId, image: $image) {
      name
      id
    }
  }
`;
