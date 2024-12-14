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
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import coverPlaceholder from '../assets/book-cover-placeholder.png';
import useAxios from '../services/useAxios';

//component renders a book singlepage
function Book() {
    const { remove } = useAxios('http://localhost:3000');
    const location = useLocation();
    const navigate = useNavigate();
    const book = location.state?.book;
    if (!book) {
        return <Typography variant="h6">No book details found</Typography>;
    }

    const deleteBook = async () => {
        await remove(`books/${book.id}`);
        navigate(-1); // Navigate back after deletion
    };
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifySelf: 'center',
                width: '40%',
                margin: 5,
            }}>
            <Box
                sx={{
                    height: 400,
                    width: '100%',
                    minWidth: 300,
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
            <Box sx={{
                    pt: 2,
                    pl: 2,
                    width: '100%',
                    }}>
                {book.genres.map((genre, i) => (
                <Chip
                    key={i}
                    label={genre}
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                />
                ))}
                <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                {book.name}
                </Typography>

                <Typography variant="body2" sx={{ mt: 2 }}> 
                <strong>Author: </strong>{book.author}
                </Typography>

                <Typography variant="body2" sx={{ mt: 2 }}>
                {book.description}
                </Typography>

                <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Start Date: </strong> {book.start ? book.start : 'N/A'}
                </Typography>

                <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>End Date: </strong> {book.end ? book.end : 'N/A'}
                </Typography>

                <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Completed: </strong> {book.completed ? 'Yes' : 'No'}
                </Typography>
                
                <Typography variant="body2" sx={{mt: 2 }}>
                <strong>Rating: </strong>
                    <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                    />
                </Typography>
                <CardActions
                    sx={{
                        pl: 0,
                        pt: 2,
                        width: '100%',
                        justifyContent: 'flex-start',
                    }}>
                    <Button size="small" color="error" onClick= {deleteBook} >Delete book</Button>
                    <Button size="small" onClick={() => navigate(-1)}>Back</Button>        
                </CardActions>
            </Box>
        </Card>
    );
}

export default Book;