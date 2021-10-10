const { gql } = require("apollo-server-core");

const typeDefs = gql`
    type Book {
        _id: ID
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
        bookCount: Int
        id: ID
    }

    type Auth {
        token: String
        user: User
    }

    type Query {

        users: [User]

        singleUser(userId: ID!): User

        me(userId: ID): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth

        deleteBook(bookId: String!, userId: ID): User

        addBook(authors: [String], description: String!, bookId: String!, image: String, link: String, title: String!, userId: ID): User
    }
`

module.exports = typeDefs;