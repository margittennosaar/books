import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Root from './routes/Root';
import Books from './routes/Books';
import Book from './routes/Book';
import AddBook from './routes/AddBook';

// Define a custom Material-UI theme for consistent styling across the application.
const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40', // Primary color for branding and main elements.
    },
    secondary: {
      main: '#ffab40', // Secondary color for highlights or accents.
    },
  },
});

function App() {
  // Define the application's routing structure using react-router-dom.
  const router = createBrowserRouter([
    {
      path: '/', // Base path of the application.
      element: <Root />, // Root layout component.
      children: [
        { path: '/', element: <Books /> }, // Route for displaying the books list.
        { path: '/book', element: <Book /> }, // Route for displaying a single book's details.
        { path: '/addnew', element: <AddBook /> }, // Route for adding a new book.
      ],
    },
  ]);

  return (
    // LocalizationProvider to support date pickers using the Day.js adapter.
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* ThemeProvider to apply the custom Material-UI theme. */}
      <ThemeProvider theme={theme}>
        {/* RouterProvider to render the router's components based on the current route. */}
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
