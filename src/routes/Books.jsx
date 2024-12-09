import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
} from '@mui/material';

function Books() {
  // State to store the list of books fetched from the API.
  const [books, setBooks] = useState([]);

  // State to track whether data is currently being loaded.
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to trigger data fetching when the component is mounted.
  useEffect(() => {
    if (books.length === 0) {
      getBooks(); // Fetch books if the list is empty.
    }
  }, []);

  /**
   * Fetches the list of books from the API using Axios.
   * Updates the books state and stops the loading spinner.
   */
  // TODO: Replace axios with useAxios hook to utilize shared request logic.
  async function getBooks() {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data); // Set the fetched books in state.
      setIsLoading(false); // Indicate that loading is complete.
    } catch (error) {
      console.error(error); // Log any errors to the console.
    }
  }


  // TODO: Implement search functionality to filter books by name or genre.

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {/* Show a loading spinner while data is being fetched. */}
      {isLoading && <CircularProgress />}

      {/* Render the books list once data has been loaded. */}
      {!isLoading && (
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
