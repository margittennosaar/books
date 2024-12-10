import { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardMedia, Button, CircularProgress, Stack, Rating, Chip, Typography, Alert } from '@mui/material';
import useAxios from '../services/useAxios';

function Books() {
  // Initialize useAxios with the base API URL.
  const { data, loading, alert, get } = useAxios('http://localhost:3000');

  // State to store the list of books fetched from the API.
  const [books, setBooks] = useState([]);


  // useEffect to trigger data fetching when the component is mounted.
  useEffect(() => {
    if (books.length === 0) {
      fetchBooks(); // Fetch books if the list is empty.
    }
  }, []);

  /**
   * Fetches the list of books using the useAxios hook.
   * Updates the local books state with the fetched data.
   */
  const fetchBooks = async () => {
    await get('books'); // Fetch data using useAxios.
  };

  // Sync the useAxios data with the local state when it changes.
  useEffect(() => {
    if (data) {
      setBooks(data); // Update local books state with fetched data.
    }
  }, [data]);

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {/* Show alert messages if present. */}
       {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}

      {/* Show a loading spinner while data is being fetched. */}
      {loading && <CircularProgress sx={{margin: "50vh"}}/>}

      {/* Render the books list once data has been loaded. */}
      {!loading && (
        <div>
          {/* Stack to organize book cards in a responsive layout. */}
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {books.map((book) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.name} // Use book name as unique key.
              >
                {/* Display the book's image at the top of the card. */}
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />

                {/* Book details section including genres, title, and author. */}
                <Box sx={{ pt: 2, pl: 2 }}>
                  {/* Display genres as chips */}
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i} // Use index as key for individual genres.
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}

                  {/* Display book title */}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>

                  {/* Display book author */}
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>

                {/* Card actions section for rating and additional actions. */}
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  {/* Display book's star rating */}
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />

                  {/* Placeholder button for future detailed view functionality */}
                  <Button size="small">Learn More</Button>
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
