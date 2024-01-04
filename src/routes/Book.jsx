// This need to be built but it will render the single book page
import { useLocation } from 'react-router-dom';

import { Card, Grid, Box, CardMedia, Stack, Rating, Chip, Typography } from '@mui/material';

function Book() {
  const location = useLocation();
  const { bookData } = location.state;
  console.log(bookData);

  return (
    <Grid container spacing={2} sx={{ mt: 2, mb: 2, ml: 'auto', mr: 'auto', width: '90vw', maxWidth: 1000 }}>
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardMedia component="img" alt={bookData.name} image={`${bookData.img}`} sx={{ maxHeight: 450 }} />
          <Rating name="read-only" value={bookData.stars} readOnly size="large" sx={{ m: 1 }} />
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3, height: '100%', boxSizing: 'border-box' }}>
          <Typography variant="h2" component="h1" sx={{ mt: 2 }}>
            {bookData.name}
          </Typography>
          <Typography variant="h5" component="h2">
            {bookData.author}
          </Typography>
          <Box sx={{ mt: 2 }}>
            {bookData.genres.map((genre, i) => (
              <Chip key={i} label={genre} variant="outlined" size="small" />
            ))}
          </Box>
          <Chip label={bookData.completed ? 'Completed' : 'Not Completed'} color="success" variant={bookData.completed ? '' : 'outlined'} sx={{ mt: 2, mb: 2 }} />
          <Stack alignItems="flex-start">
            <Typography variant="h6" component="body1">{`Start date: ${bookData.start ? bookData.start : '--not set--'}`}</Typography>
            <Typography variant="h6" component="body1">{`End date: ${bookData.end ? bookData.end : '--not set--'}`}</Typography>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Book;
