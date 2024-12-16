// import { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxios from "axios-hooks";
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
  TextField,
} from "@mui/material";
// import { useEffect } from "react";

// Books func to handle books data fetching and render books
function Books() {
  const [{ data: books, loading: isLoading, error }] = useAxios(
    "http://localhost:3000/books"
  );
  const navigate = useNavigate(); // for navigating to book page
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch books on component mount
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/books");
  //       setBooks(response.data); // Update books state
  //     } catch (err) {
  //       setError(err); // Handle errors
  //     } finally {
  //       setIsLoading(false); // End loading state
  //     }
  //   };
  //   fetchBooks();
  // }, []);

  // TODO: Implement search functionality
  // Filter books based on the search query
  const filteredBooks = books?.filter(
    (book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {isLoading && <CircularProgress />}
      {error && <Typography color="error">Error loading books!</Typography>}
      {!isLoading && (
        <div>
          {/* Search Bar */}
          <TextField
            label="Search Books"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Display Filtered Books */}
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks.map((book) => (
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15%",
                  minWidth: 200,
                }}
                key={book.name}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
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
                    justifyContent: "space-between",
                    mt: "auto",
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={parseFloat(book.stars)} //Expected a number
                    readOnly
                    size="small"
                  />
                  <Button
                    size="small"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    Learn More
                  </Button>
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
