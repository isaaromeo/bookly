
import { useApiData } from "../hooks/useApiData";
import { useNavigate } from "react-router-dom";
import { Blockquote } from "@chakra-ui/react";
import { RatingGroup } from "@chakra-ui/react";
//import { colorPalettes } from "compositions/lib/color-palettes";


const Home = () => {

  const books = useApiData(
    "https://bookly-back.onrender.com/api/books",
    "books"
  );
  console.log(books)
  const navigate = useNavigate();

  const handleClick = (section, id) => {
    navigate(`/${section}/${id}`);
  };


  return (
    <div>
      <h1>Welcome to Bookly</h1>

      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id} onClick={() => handleClick("books", book._id)}>
            <img
              src={book.cover}
              alt={book.name}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Character+Image";
              }}
            />
            <h3>{book.name}</h3>
            <p>Author:{book.author}</p>
            <RatingGroup.Root
              readOnly
              allowHalf
              count={5}
              defaultValue={book.rating}
              size="sm"
              colorPalette={"yellow"}
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>

            <Blockquote.Root>
              <Blockquote.Content cite="https://chakra-ui.com/docs/components/blockquote">
                {book.sinopsis}
              </Blockquote.Content>
              <Blockquote.Caption>
                <cite>{book.author}</cite>
              </Blockquote.Caption>
            </Blockquote.Root>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
