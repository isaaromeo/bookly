import { useEffect, useState} from "react";
import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useClickOutside } from "../hooks/useClickOutside";


export const Search = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  //TODO: Hacer hook personalizado para el search
  const searchBooks = async () => {
    console.log(searchQuery.length);
    //minimo para realizar busqueda
    if (searchQuery.length < 2) {
      console.log("jsjs")
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
        console.log("allbooks", filteredBooks);
        //filtramos todos los books por el searchquery en las tres categorias
        const filteredBooks = allBooks.filter(
          (book) =>
            book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.isbn?.includes(searchQuery)
        );

        setSearchResults(filteredBooks);
        console.log("resultados busqyeda", filteredBooks);
      }
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchBooks();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
      searchBooks();
      console.log("resultados busqueda", searchResults);
    
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
