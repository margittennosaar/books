// Import necessary dependencies from React, React Router, and Material-UI
import { Link } from "react-router-dom";
import { Button, Box, AppBar, Toolbar, Typography } from "@mui/material";

// Header component for displaying the application's navigation bar
function Header() {
  return (
    // Use a Box component for styling and layout purposes
    <Box sx={{ flexGrow: 1 }}>
      {/* Create an AppBar for the navigation */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                color: "inherit",
                textDecoration: "none",
              }}>
              Books
            </Typography>
          </Typography>

          {/* Create navigation buttons for the home page and adding a new book */}
          <Button color="inherit" variant="text" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" variant="text" component={Link} to="/addnew">
            Add New
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// Export the Header component as the default export
export default Header;
