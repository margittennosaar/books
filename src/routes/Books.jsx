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
  TextField,
} from "@mui/material";

function Books() {
  const { data: books, loading, get } = useAxios("http://localhost:3000");
  const [searchResult, setSearchResult] = useState();

  /* This function will call the getBooks function if there aren't any books displayed to the UI. */
  useEffect(() => {
    get("books");
  }, []);

  // TODO: Implement search functionality
  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        sx={{ mx: "auto", mb: 2 }}
      />
      {loading && <CircularProgress />}
      {!loading && books && (
        <div>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {/* Mapping through the books to show it in the card. */}
            {books.map((book) => (
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
