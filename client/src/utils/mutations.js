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

export const ADD_BOOK = gql`
    mutation saveBook($authors:[String], $bookId:String!, $description:String!, $image:String, $title:String!, $userId: ID) {
        addBook(authors: $authors, bookId:$bookId, description:$description, image:$image, title:$title, userId:$userId) {
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

export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
		    token
            user {
                username
                email
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
    }
`

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
            username
            }
        }
    }
`