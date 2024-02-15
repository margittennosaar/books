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
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (data.length === 0) {
      get('books');
    }//if condition is met then get books function is called
    const searchHandler = (e) => {
      setSearch(e.target.value.toLowerCase())
    }
  }, []);

  // TODO: Replace axios with useAxios hook
  async function getBooks() {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Implement search functionality
  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack
            sx={{ justifyContent: 'space-around' }}
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
