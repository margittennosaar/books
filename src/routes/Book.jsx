
import { useParams } from "react-router-dom";
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
  } from "@mui/material";

function Book() {
    const params = useParams()


    return (<Box sx={{ mx: "auto", p: 2 }}>
    {loading && <CircularProgress />}
    {!loading && (
      <div>
        <Stack
          sx={{ justifyContent: "space-around" }}
          spacing={{ xs: 1 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {searchResults.map((book) => (
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
                component='img'
              />
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
                  value={Number(book.stars)}
                  readOnly
                  size="small"
                />
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </div>
    )}
  </Box> );
}

export default Book;