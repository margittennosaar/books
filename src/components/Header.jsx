import { Link } from 'react-router-dom';
import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material';

function Header() {  // creating a header component
    return (
        <Box sx={{ flexGrow: 1 }}>  {/* container of the header */}
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
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Books
                        </Typography>
                    </Typography>

                    <Button color="inherit" variant="text" component={Link} to="/">  {/* button for home */}
                        Home
                    </Button>
                    <Button color="inherit" variant="text" component={Link} to="/addnew"> {/* button for add new */}
                        Add New
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
