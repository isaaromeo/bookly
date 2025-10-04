import { useEffect, useState} from "react";
import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useClickOutside } from "../hooks/useClickOutside";


export const Search = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  //TODO: Hacer hook personalizado para el search
  useEffect(() => {
    const searchBooks = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bookly-back.onrender.com/api/books"
        );
        if (response.ok) {
          const allBooks = await response.json();

          const filteredBooks = allBooks.filter(
            (book) =>
              book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              book.isbn?.includes(searchQuery)
          );

          setSearchResults(filteredBooks.slice(0, 5));
          console.log("results: ", searchResults);
        }
      } catch (error) {
        console.error("Error searching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchBooks, 3000);
    
    return () => clearTimeout(timeoutId);
    
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      console.log("results: ", searchResults)
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <InputGroup startElement={<LuSearch />}>
        <Input
          placeholder="Search books by author, title, isbn..."
          value={searchQuery}
          rounded="full"
          onChange={handleSearchChange}
        />
      </InputGroup>
    </form>
  );
};

export default Search;
