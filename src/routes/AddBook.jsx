import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import { DateField } from "@mui/x-date-pickers/DateField";
import useAxios from "../services/useAxios";
import { bookGenres } from "../genres";
import { Stack, Typography } from "@mui/material";

/* To add new books to the books.json */
function AddBook() {
  const { alert, post } = useAxios("http://localhost:3000");
  const [rateValue, setRateValue] = useState(3);
  const [book, setBook] = useState({
    author: "",
    name: "",
    genres: [],
    completed: false,
    start: null,
    end: null,
    stars: null,
  });
  /* To change the genre of the book. It will take the value from the input and set the book genre along with other information about the book. */
  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === "string" ? value.split(",") : value,
    });
  };
  /* This function will add the ratings of the book. I will also take the value from the input and set to the stars along with other information about the book. */

  const rateChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      stars: value,
    });
  };

  /* This is the main function to add a new book. Upon submitting the form, it will take the inputs from the values of the inputs and store those values inside setBook. */
  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox" && name === "completed") {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  /* This postHandler function will add the new book to the books.json. */
  function postHandler() {
    post("books", book);
  }

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
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
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
        />
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
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
          {/* Mapping the genre name from the genres.js file. */}
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />
        <Stack spacing={1}>
          <Rating
            name="stars"
            value={rateValue}
            onClick={rateChangeHandler}
            size="large"
            onChange={(event, newValue) => {
              setRateValue(newValue);
            }}
          />
        </Stack>
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
