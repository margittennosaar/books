import { useEffect, useState, useMemo } from 'react';
import {
    Box,
    Card,
    CardActions,
    CardMedia,
    Button,
    CircularProgress,
    Stack,
    Rating,
    Chip,
    Typography,
    TextField,
} from '@mui/material';
import useAxios from '../services/useAxios';
import { useNavigate } from 'react-router-dom';

function Books() {
    const apiUrl = 'http://localhost:3000';
    const { data, alert, loading, error, get } = useAxios(apiUrl);
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await get('books');
                console.log(response); // Log response for debugging
                setBooks(response); // Update state with fetched books
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        if (data.length === 0) {
            getBooks();
        }
    }, []);

    useMemo(() => {
        if (searchTerm) {
            const filteredBooks = [];
            filteredBooks.push(
                data.filter(
                    (item) =>
                        item.author.includes(searchTerm) ||
                        item.name.includes(searchTerm) ||
                        item.genres.some((genre) =>
                            genre
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        )
                )
            );
            console.log(filteredBooks);
            setBooks(filteredBooks.flat());
        } else {
            setBooks(data);
        }
    }, [searchTerm]);

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
    };

    return (
        <Box sx={{ mx: 'auto', p: 2 }}>
            {loading && <CircularProgress />}
            {!loading && (
                <div>
                    <Stack
                        sx={{ justifyContent: 'space-around' }}
                        spacing={{ xs: 1 }}
                        direction='row'
                        useFlexGap
                        flexWrap='wrap'
                    >
                        <TextField
                            id='outlined-basic'
                            label='Search'
                            variant='outlined'
                            value={searchTerm}
                            onChange={handleChange}
                        />

                        {books?.map((book) => (
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '15%',
                                    minWidth: 200,
                                }}
                                key={book.name}
                            >
                                <CardMedia
                                    sx={{ height: 250 }}
                                    image={book.img}
                                    title={book.name}
                                />
                                <Box sx={{ pt: 2, pl: 2 }}>
                                    {book.genres.map((genre, i) => (
                                        <Chip
                                            key={i}
                                            label={genre}
                                            variant='outlined'
                                            size='small'
                                        />
                                    ))}
                                    <Typography
                                        variant='h6'
                                        component='h2'
                                        sx={{ mt: 2 }}
                                    >
                                        {book.name}
                                    </Typography>
                                    <Typography
                                        variant='subtitle1'
                                        gutterBottom
                                    >
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
                                        name='read-only'
                                        value={+book.stars}
                                        readOnly
                                        size='small'
                                    />
                                    <Button
                                        onClick={() =>
                                            navigate(`/book/${book.id}`)
                                        }
                                        size='small'
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Stack>
                </div>
            )}
        </Box>
    );
}

export default Books;
