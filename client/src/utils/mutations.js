import { gql } from '@apollo/client';

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            savedBooks {
                authors
                _id
                bookId
                title
                description
                image
        }
  }
}
`