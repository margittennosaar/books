// importing items such as A React hook for managing state in functional components.
// imports axios - which is similar to fetch in vanilla js
// importing react elements from other files

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Box, Card, CardActions, CardMedia, Button, CircularProgress, Stack, Rating, Chip, Typography } from '@mui/material';

import useAxios from '../services/useAxios';

function Books() {
  const { data, loading, get } = useAxios('http://localhost:3000');

  // checks whether the books array is 0 and if it is it calls getBooks

  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);

  // TODO: Replace axios with useAxios hook

  // old function to fetch books. This will be replaced
  /*   async function getBooks() {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  } */

  // new function to fetch books

  function getBooks() {
    get('books');
  }

  // TODO: Implement search functionality
  {
    /* show loading circle if data is still being fetched */
  }
  {
    /* maps books and displays it on card */
  }
  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack sx={{ justifyContent: 'space-around' }} spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
            {data.map((book) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.name}
              >
                <CardMedia sx={{ height: 250 }} image={book.img} title={book.name} />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip key={i} label={genre} variant="outlined" size="small" />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  {/* displays raiting on card */}
                  <Rating name="read-only" value={book.stars} readOnly size="small" />
                  <Link to="/book" state={{ bookData: { ...book } }}>
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
