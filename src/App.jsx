import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Root from './routes/Root';
import Books from './routes/Books';
import Book from './routes/Book';
import AddBook from './routes/AddBook';

// Creating a theme for Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40',
    },
    secondary: {
      main: '#ffab40',
    },
  },
});
// App component that renders the RouterProvider component
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <Books /> },
        { path: '/book', element: <Book /> },
        { path: '/addnew', element: <AddBook /> },
      ],
    },
  ]);
// Wrapping the RouterProvider component with ThemeProvider and LocalizationProvider
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
