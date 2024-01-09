import { useEffect, useState } from "react";
import axios from "axios";
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
} from "@mui/material";

// Books component represents the page for displaying a list of books
function Books() {
  // State to store the list of books
  const [books, setBooks] = useState([]);
  // State to track the loading state of book data
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to fetch books data
  useEffect(() => {
    // Fetch books data only if the books array is empty
    if (books.length === 0) {
      getBooks();
    }
  }, []);

  // Function to fetch books data using axios
  // TODO: Replace axios with useAxios hook
  async function getBooks() {
    try {
      // Make a GET request to retrieve books data
      const response = await axios.get("http://localhost:3000/books");
      setBooks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Implement search functionality
  // Return the JSX for rendering the Books component
  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <div>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap">
            {/* Map through the books array and render each book as a Card */}
            {books.map((book) => (
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15%",
                  minWidth: 200,
                }}
                key={book.name}>
                {/* CardMedia component for displaying the book cover image */}
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {/* Chip components for displaying book genres */}
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  {/* Typography components for displaying book name and author */}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                {/* CardActions component for additional actions */}
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    mt: "auto",
                    pl: 2,
                  }}>
                  {/* Rating component for displaying the book's rating */}
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                  {/* Button component connects to learn more about the book */}
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
