
import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';
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

  const booksUrl = 'http://localhost:3000';
  const { data, get, loading } = useAxios(booksUrl);
  
  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    } //if condition is met then get books function is called
  }, []);

  // TODO: Replace axios with useAxios hook
   function getBooks() {
    get('books')

  }

  return (

<>
      {/* search functionality */}
      <TextField
      label="search name or author"
        variant="outlined"
        style={{
          margin: "20px auto",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          width: "200px",
          // value={searchQuery}
  // onChange={(e) => setSearchQuery(e.target.value)}
        }}
      />
      <Button
        variant="contained"
        style={{ margin: "20px auto", display: "flex" }}
        // onClick={handleSearch}
      >
        Search
      </Button>

      <Box sx={{ mx: "auto", p: 2 }}>
        {loading && <CircularProgress />}
        {!loading && (
          <div>
            <Stack
              sx={{ justifyContent: "space-around" }}
              spacing={{ xs: 1 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
               
            {data
  .filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()))
  .map((book) => (

              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.name}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                  component='img'

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
                      justifyContent: 'space-between',
                      mt: 'auto',
                      pl: 2,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={Number(book.stars)}
                      readOnly
                      size="small"
                    />
                    <Button size="small" component={Link} to={`/${book.id}`}>Learn More</Button>
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
