import { useEffect, useState } from 'react';
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
  Autocomplete
} from '@mui/material';
import useAxios from '../services/useAxios';

//component renders a list of books with their details


//reranders a list of books with their details on change of books
function Books() {
  const {data:books, alert, loading, get}  = useAxios('http://localhost:3000');//use custom hook to get data from the server

  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
  }, [books]);

  const getBooks = async () => {
    await get('books');
  }

  const genres = [...new Set(books.flatMap((book) => book.genres))];

  // TODO: Implement search functionality
  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack direction="row" spacing={8} sx={{ justifyContent: "center", alignItems: "center", width: '100%' , height: 80}}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={books.map((option) => option.name)}
              renderInput={(params) => 
                <TextField {...params} label="book name" />}
              sx={{ width: '25%' }}
            />
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={books.map((option) => option.author)}
              sx={{ width: '25%' }}
              renderInput={(params) => 
                <TextField {...params} label="Author"/>}
            />
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={genres}
                renderInput={(params) => 
                  <TextField {...params} label="Genre"/>}
                sx={{ width: '25%' }}
            />
          </Stack>

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
                    justifyContent: 'space-between',
                    mt: 'auto',
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
