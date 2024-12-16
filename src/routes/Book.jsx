// import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import axios from "axios";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

// Book is called from parent: Books
function Book() {
  const { id } = useParams(); // Get the book ID from the route
  // Axios get book details from endpoint (localhost... :id)
  const [{ data: book, loading, error }] = useAxios(
    `http://localhost:3000/books/${id}`
  );

  //   console.log(id);

  const navigate = useNavigate(); // for back navigation

  // Handler to remove book
  async function removeBookHandler() {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:3000/books/${id}`);
        navigate("/");
      } catch (error) {
        console.error("Failed to delete the book", error);
      }
    }
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error loading book details.</Typography>;
  }

  return (
    <Box sx={{ mx: "auto", p: 4 }}>
      <div>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Back
        </Button>
        <br />
        <br />
      </div>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        {book.name}
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Author: {book.author}
      </Typography>
      {/* <Typography variant="body1" sx={{ mb: 1 }}>
        Rating: {book.stars} stars
      </Typography> */}
      <Rating name="read-only" value={parseFloat(book.stars)} readOnly />
      <Typography variant="body2" sx={{ mb: 1 }}>
        Book ID: {book.id}
      </Typography>
      {/* console.log(book.stars); */}
      <br />
      <Button variant="contained" onClick={() => removeBookHandler()}>
        Delete
      </Button>
    </Box>
  );
}

export default Book;
