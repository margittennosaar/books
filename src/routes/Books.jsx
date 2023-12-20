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
import useAxios from "../services/useAxios";

function Books() {
  const { data, loading, get } = useAxios("http://localhost:3000"); // using the useAxios hook all those variable in curly bracket will be fetched from URl

  const [searchInput, setSearchInput] = useState(""); // sets the search data

  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);

  /* const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

  if (searchInput.length > 0) {
    data.filter((book) => {
      book.name.toLowerCase().includes(searchInput.toLowerCase());
    });
  } */

  const handleChange = (e) => {
    const searchTerm = e.target.value;

    setSearchInput(searchTerm);
  };

  const filteredItems = data.filter(
    (book) =>
      book.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      book.author.toLowerCase().includes(searchInput.toLowerCase())
  );

  // TODO: Replace axios with useAxios hook

  function getBooks() {
    get("books");
  }

  // TODO: Implement search functionality
  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <input
            type="search"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput}
          />

          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredItems.map((book) => (
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
                    value={book.stars}
                    readOnly
                    size="small"
                  />
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
