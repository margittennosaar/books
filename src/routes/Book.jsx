import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardActions,
    CardMedia,
    Rating,
    Chip,
    Typography,
    Button,
} from '@mui/material';
import coverPlaceholder from '../assets/book-cover-placeholder.png';

//component renders a book singlepage
function Book() {
    const location = useLocation();
    const navigate = useNavigate();
    const book = location.state?.book;

    if (!book) {
        return <Typography variant="h6">No book details found</Typography>;
    }

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifySelf: 'center',
                width: '25%',
                minWidth: 400,
                margin: 5,
            }}>
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                <CardMedia
                    component="img"
                    sx={{ height: '100%', width: 'auto' }}
                    image={book.img ? book.img : coverPlaceholder}
                    title={book.name}
                />
            </Box>
            <Box sx={{ pt: 2, pl: 2 }}>
                {book.genres.map((genre, i) => (
                <Chip
                    key={i}
                    label={genre}
                    variant="outlined"
                    size="small"
                />
                ))}
                <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                {book.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                {book.author}
                </Typography>
            </Box>
            <CardActions
                sx={{
                justifyContent: 'space-between',
                mt: 'auto',
                pl: 2,
                }}
            >
                <Rating
                name="read-only"
                value={book.stars}
                readOnly
                size="small"
                />
                <Button size="small" onClick={() => navigate(-1)}>Back</Button>
            </CardActions>
        </Card>
    );
}

export default Book;