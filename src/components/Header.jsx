import { Link } from 'react-router-dom';
import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
    return (
        //the header box
        <Box sx={{ flexGrow: 1 }}>
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

export default Header;
