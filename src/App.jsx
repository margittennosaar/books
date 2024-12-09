import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Root from './routes/Root';
import Books from './routes/Books';
import Book from './routes/Book';
import AddBook from './routes/AddBook';

// Create a custom Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40', // Primary color (teal)
    },
    secondary: {
      main: '#ffab40', // Secondary color (orange)
    },
  },
});

function App() {
  // Define the routing structure using React Router
  const router = createBrowserRouter([
    {
      path: '/', // Root path of the application
      element: <Root />, // Root layout component
      children: [
        { path: '/', element: <Books /> }, // Default route to display the list of books
        { path: '/book', element: <Book /> }, // Route to display a single book's details
        { path: '/addnew', element: <AddBook /> }, // Route to add a new book
      ],
    },
  ]);

  return (
    // Provide localization for date pickers using Day.js adapter
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Apply the custom theme to the application */}
      <ThemeProvider theme={theme}>
        {/* Provide routing configuration */}
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
