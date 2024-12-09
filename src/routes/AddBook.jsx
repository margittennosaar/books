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

/**
 * A component for adding a new book.
 * It uses MUI components for styling and layout.
 */
function AddBook() {
  // Custom Axios hook for handling API requests and alert state.
  const { alert, post } = useAxios('http://localhost:3001');

  // Local state to manage book details and rating value.
  const [rateValue, setRateValue] = useState(3); // Default rating value.
  const [book, setBook] = useState({
    author: '',
    name: '',
    genres: [],
    completed: false,
    start: null,
    end: null,
    stars: null,
  });

  /**
   * Handles changes to the genres dropdown.
   * Updates the `genres` array in the book state.
   */
  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === 'string' ? value.split(',') : value,
    });
  };

  /**
   * Handles changes to the star rating.
   * Updates the `stars` property in the book state.
   */
  const rateChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      stars: value,
    });
  };

  /**
   * Handles changes to form fields.
   * Updates the relevant properties in the book state.
   */
  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox' && name === 'completed') {
      // Update the `completed` state for the checkbox.
      setBook({ ...book, [name]: checked });
    } else {
      // Update other fields.
      setBook({ ...book, [name]: value });
    }
  };

  /**
   * Handles form submission by posting the book data.
   */
  function postHandler(e) {
    e.preventDefault(); // Prevent default form submission behavior.
    post('books', book); // Send book data to the API.
  }

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: 'auto', width: '25%' }}
      >
        {/* Display an alert if there is a message to show. */}
        {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
        
        {/* Header */}
        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        
        {/* Title input */}
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />

        {/* Author input */}
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
        />

        {/* Image URL input */}
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
        />

        {/* Genre selection */}
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

        {/* Completed checkbox */}
        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        {/* Start date input */}
        <DateField name="start" label="Started" />

        {/* End date input (disabled if the book isn't completed) */}
        <DateField name="end" label="Finished" disabled={!book.completed} />

        {/* Rating component */}
        <Stack spacing={1}>
          <Rating
            name="stars"
            value={rateValue}
            size="large"
            onClick={rateChangeHandler}
            onChange={(event, newValue) => {
              setRateValue(newValue);
            }}
          />
        </Stack>

        {/* Submit button */}
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
