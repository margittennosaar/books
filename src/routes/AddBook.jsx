import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Rating,
  Button,
  OutlinedInput,
  MenuItem,
  Select,
  Alert,
  Stack,
  Typography,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { bookGenres } from "../genres";

function AddBook() {
  const [book, setBook] = useState({
    author: "",
    name: "",
    genres: [],
    completed: false,
    start: null,
    end: null,
    stars: null,
  });

  const [rateValue, setRateValue] = useState(0);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  // Show alert for 5 seconds
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => setAlert({ ...alert, show: false }), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  // Handler to update book details
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      genres: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // Handler to submit book
  const postHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/books", {
        ...book,
        stars: rateValue, // Add rating value to the book
      });
      setAlert({
        show: true,
        message: "Book added successfully!",
        type: "success",
      });
      // Optionally clear form
      setBook({
        author: "",
        name: "",
        genres: [],
        completed: false,
        start: null,
        end: null,
        stars: null,
      });
      setRateValue(0); // Reset rating
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to add book. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: "auto", width: "25%" }}
      >
        {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}

        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        <TextField
          name="name"
          label="Title"
          variant="outlined"
          value={book.name}
          onChange={handleChange}
        />
        <TextField
          name="author"
          label="Author"
          variant="outlined"
          value={book.author}
          onChange={handleChange}
        />
        <TextField
          name="img"
          label="Image (url)"
          variant="outlined"
          value={book.img || ""}
          onChange={handleChange}
        />
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

        <FormControlLabel
          name="completed"
          control={
            <Checkbox checked={book.completed} onChange={handleChange} />
          }
          label="Completed"
        />
        <DateField
          name="start"
          label="Started"
          value={book.start}
          onChange={(newValue) =>
            setBook((prevBook) => ({ ...prevBook, start: newValue }))
          }
        />
        <DateField
          name="end"
          label="Finished"
          value={book.end}
          onChange={(newValue) =>
            setBook((prevBook) => ({ ...prevBook, end: newValue }))
          }
          disabled={!book.completed}
        />
        <div>
          <Rating
            name="stars"
            value={rateValue}
            onChange={(event, newValue) => {
              setRateValue(newValue);
            }}
            size="large"
          />
        </div>
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
