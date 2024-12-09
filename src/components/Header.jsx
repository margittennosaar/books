import { Link } from 'react-router-dom';
import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material';

/**
 * The Header component serves as the application's navigation bar.
 * It provides links to the Home and Add New pages and includes branding for the app.
 */
function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* AppBar component to create a top navigation bar. */}
            <AppBar position="static">
                <Toolbar>
                    {/* Main branding or title for the application. */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link} // Link to the homepage.
                            to="/"
                            sx={{
                                mr: 2,
                                color: 'inherit', // Inherit text color from the theme.
                                textDecoration: 'none', // Remove underline for the link.
                            }}
                        >
                            Books
                        </Typography>
                    </Typography>

                    {/* Navigation links to different pages in the application. */}
                    <Button
                        color="inherit" // Use the theme's "inherit" color for consistency.
                        variant="text"
                        component={Link} // Link to the home page.
                        to="/"
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit" 
                        variant="text"
                        component={Link} // Link to the Add New page.
                        to="/addnew"
                    >
                        Add New
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
