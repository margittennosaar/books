# Notes

Steps (beginning):

- Forked and copied remote repository
- installed dependencies

Fixes / Steps:

- Error due to stars passed as string not a number. Added parseFloat
- Error on image. Fixed link (took different one).

1. Ticket #101 - Enhance code documentation

- Added descriptions to functions
- In Books.jsx and AddBook() changed 3001 port to 3000

2. Ticket #102 - Refactor Books.jsx to use a custom hook

- Installed axios hooks `npm install axios-hooks axios`
- Replaced axios get with useAxios

3. Ticket #103 - Add search functionality to Books.jsx

## ----------------------------------------------

## Replacing Axios with Axios Hook

BEFORE:

```js
const [books, setBooks] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  // checking if books array is empty and if so, getBooks is called.
  if (books.length === 0) {
    getBooks();
  }
}, []); // Runs once on mount

async function getBooks() {
  try {
    const response = await axios.get("http://localhost:3000/books");
    setBooks(response.data);
    setIsLoading(false);
  } catch (error) {
    console.error(error);
  }
}
```

AFTER:

```js
function Books() {
  const [{ data: books, loading: isLoading, error }] = useAxios(
    "http://localhost:3000/books"
  );
  ...
}
```

`{error && <Typography color="error">Error loading books!</Typography>}`
