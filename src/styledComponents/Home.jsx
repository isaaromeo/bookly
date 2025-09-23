
import { useApiData } from "../hooks/useApiData";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const books = useApiData(
    "https://empyrean-api.onrender.com/api/books",
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

<p>
  Enter the deadly and breathtaking world of The Empyrean—the bestselling
  fantasy series by Rebecca Yarros that has captivated millions with its
  high-stakes battles, dragon bonds, and unforgettable romance. Set in a
  war-torn land where only the fiercest survive, the series follows the
  trials of cadets at Basgiath War College, where future dragon riders are
  forged through discipline, sacrifice, and brutal competition.
</p>


  <h2>Books</h2>
  <ul>
    {books.map((book) => (
      <il
        key={book._id}
        onClick={() => handleClick("books", book._id)}
      >
        <FeaturedImage
          src={book.cover}
          alt={book.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200?text=Character+Image";
          }}
        />
        <FeaturedTitle>{book.name}</FeaturedTitle>
        <p>Author:{book.author}</p>
        <p>Rating: {book.rating}/5</p>
      </il>
      
    ))}
    </ul>

    </div>
      
  );
};

export default Home;
