import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { DateField } from '@mui/x-date-pickers/DateField';
import useAxios from '../services/useAxios';
import { bookGenres } from '../genres';
import { Stack, Typography } from '@mui/material';

function AddBook() {
  // Custom hook for Axios-based API calls and alerts
  const { alert, post } = useAxios('http://localhost:3001'); // Base URL for API

  // State to manage the rating value
  const [rateValue, setRateValue] = useState(3);

  // State to manage the book information
  const [book, setBook] = useState({
    author: '', // Book author
    name: '', // Book name/title
    genres: [], // List of genres
    completed: false, // Reading status
    start: null, // Start date
    end: null, // End date (if completed)
    stars: null, // Star rating
  });

  // Handler for genre selection change
  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === 'string' ? value.split(',') : value, // Handle multiple selections
    });
  };

  // Handler for rating change
  const rateChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      stars: value, // Update the star rating in the state
    });
  };

  // Handler for other input changes
  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox' && name === 'completed') {
      setBook({ ...book, [name]: checked }); // Update checkbox value
    } else {
      setBook({ ...book, [name]: value }); // Update other fields
    }
  };

  // Handler to post the book data to the server
  function postHandler(e) {
    e.preventDefault(); // Prevent default form submission behavior
    post('books', book); // Call the `post` function with the `books` endpoint and book data
  }

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: 'auto', width: '25%' }}
      >
        {/* Display an alert if there's a message */}
        {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}

        {/* Page heading */}
        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>

        {/* Input for book title */}
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />

        {/* Input for book author */}
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
        />

        {/* Input for book image URL */}
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
        />

        {/* Select input for genres */}
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        {/* Checkbox for reading status */}
        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        {/* Date fields for start and end dates */}
        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />

        {/* Star rating input */}
        <Stack spacing={1}>
          <Rating
            name="stars"
            value={rateValue}
            size="large"
            onChange={(event, newValue) => {
              setRateValue(newValue); // Update local state for rating
              setBook({ ...book, stars: newValue }); // Update book state
            }}
          />
        </Stack>

        {/* Button to submit the form */}
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
