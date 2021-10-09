import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { removeBookId } from '../utils/localStorage';
import { REMOVE_BOOK } from '../utils/mutations';
import {QUERY_ME} from '../utils/queries'

const SavedBooks = () => {

  const { data, loading, refetch } = useQuery(QUERY_ME)
  
  const userData = data?.me || {}
  
  const [ deleteBook, {error} ] = useMutation(REMOVE_BOOK, {
    refetchQueries: [QUERY_ME]
  })

  const userDataLength = Object.keys(userData).length;

  useEffect(() => {refetch()}, [userDataLength,refetch]);

  
  const handleDeleteBook = async (bookId) => {

    try{
      deleteBook(
        {
          variables: {bookId: bookId}
        }
      )

      removeBookId(bookId)
    } catch {
      console.error(error)
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
