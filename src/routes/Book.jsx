import {
    Container,
    CardMedia,
    Box,
    Typography,
    CardActions,
    Chip,
    Button,
    Rating,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';
import { useParams } from 'react-router-dom';

function Book() {
    const [book, setBook] = useState({});
    const apiUrl = 'http://localhost:3000';
    const { data, alert, loading, error, get } = useAxios(apiUrl);
    const { id } = useParams();

    useEffect(() => {
        const getBook = async () => {
            const response = await get(`books/${id}`);
            setBook(response);
        };

        getBook();
    }, []);
    return (
        <Container
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
                {book?.genres?.map((genre, i) => (
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
                <Button size='small'>Learn More</Button>
            </CardActions>
        </Container>
    );
}

export default Book;
