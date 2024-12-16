import { useEffect, useState } from 'react'; 
import '../services/useAxios';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


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
import useAxios from '../services/useAxios';

function Books() {  //define a function for books
  const [searchQuery, setSearchQuery] = useState([]);  //set the books
  const [filteredBooks, setFilteredBooks] = useState([]);  //set the filtered books


  const apiURL = 'http://localhost:3000';  //set the apiURL
  const { data, loading, get} = useAxios(apiURL);



  useEffect(() => {  //used useEffect to get the books, if the books are empty then get the books
    if (!data || data.length === 0) {
      getBooks();
    }
  }, []);

  async function getBooks() {
    try {
      await get("books")
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (searchQuery.length > 0) {
      const result = data.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(result);
    } else {
      setFilteredBooks(data);
    }
  }, [searchQuery, data]);

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <form style={{ display: "flex", alignItems: "center" }} onSubmit={(e) => e.preventDefault()}>
            <TextField
              id="search-bar"
              className="text"
              variant="outlined"
              placeholder="Search book by title, author, or genre"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{
                width: 350,
                margin: "10px auto"
              }}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
          </form>
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks?.map((book) => (
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
