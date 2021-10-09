import { gql } from '@apollo/client'

export const QUERY_ME = gql`
    query getMe {
      me {
        _id
        username
        email
        password
        savedBooks {
          authors
          _id
          bookId
          title
          description
          image
        }
        bookCount
        id
      }
}
`