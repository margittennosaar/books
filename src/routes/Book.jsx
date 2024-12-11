import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Book is called from parent: Books
function Book() {
  const { id } = useParams(); // Get the book ID from the route
  // Axios get book details from endpoint (localhost... :id)
  const [{ data: book, loading, error }] = useAxios(
    `http://localhost:3000/books/${id}`
  );

  const navigate = useNavigate();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error loading book details.</Typography>;
  }

  return (
    <Box sx={{ mx: "auto", p: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        {book.name}
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Author: {book.author}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Rating: {book.stars} stars
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Book ID: {book.id}
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Back
      </Button>
    </Box>
  );
}

export default Book;
