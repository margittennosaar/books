// Import necessary dependencies from React and Material-UI
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Root from "./routes/Root";
import Books from "./routes/Books";
import Book from "./routes/Book";
import AddBook from "./routes/AddBook";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d40", // Set the theme's primary color
    },
    secondary: {
      main: "#ffab40", // Set the theme's secondary color
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Books /> }, // Route for displaying books
        { path: "/book", element: <Book /> }, // Route for displaying a single book
        { path: "/addnew", element: <AddBook /> }, // Route for adding a new book
      ],
    },
  ]);

  // Return the entire application wrapped with LocalizationProvider and ThemeProvider
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

// Export the App component as the default export
export default App;
