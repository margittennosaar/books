import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Root from './routes/Root';
import Books from './routes/Books';
import Book from './routes/Book';
import AddBook from './routes/AddBook';

const theme = createTheme({  // creating a theme for the app
  palette: {
    primary: {
      main: '#004d40',
    },
    secondary: {
      main: '#ffab40',
    },
  },
});

function App() {  
  const router = createBrowserRouter([  //creating a router for the app
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>  {/* used the localization provider to set the date adapter */}
      <ThemeProvider theme={theme}>   {/* used the theme provider to set the theme */}
        <RouterProvider router={router}></RouterProvider> {/* used the router provider to set the router */}
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
