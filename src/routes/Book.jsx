import useAxios from "../services/useAxios";
import { Link, useParams } from "react-router-dom";

function Book() {
    const params = useParams()
    let id = params.id;
    const booksUrl = 'http://localhost:3000';
    const { data, get } = useAxios(booksUrl);

    // TODO: Replace axios with useAxios hook

    useEffect(() => {
        if (data.length === 0) {
            getBooks();
        }
    }, []);

    function getBooks() {
        get(`books/${id}`)
    }
    return ( <div>Book will be here</div> );
}

export default Book;