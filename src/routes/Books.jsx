import { useEffect, useState } from "react";
import useAxios from "../services/useAxios";
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
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function Books() {
  const { data: books, loading, get } = useAxios("http://localhost:3000");
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  /* This function will call the getBooks function if there aren't any books displayed to the UI. */
  useEffect(() => {
    get("books");
  }, []);

  // Update filtered books according to the search queries (book title, author or genres)
  useEffect(() => {
    if (books) {
      const lowerCaseSearch = search.toLowerCase();
      const result = books.filter(
        (book) =>
          book.name.toLowerCase().includes(lowerCaseSearch) ||
          book.author.toLowerCase().includes(lowerCaseSearch) ||
          book.genres.some((genre) =>
            genre.toLowerCase().includes(lowerCaseSearch)
          )
      );
      setFilteredBooks(result);
    }
  }, [books, search]);

  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          mb: 5,
          mx: "auto",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {loading && <CircularProgress />}
      {!loading && filteredBooks && (
        <div>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {/* Mapping through the filteredBooks to show it in the card. */}
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
                  {/* Mapping through the genre to show it in a chip inside the card component. */}
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
