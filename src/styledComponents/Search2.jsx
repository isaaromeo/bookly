import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  InputGroup,
  Card,
  VStack,
  HStack,
  Text,
  Portal,
  Box,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useClickOutside } from "../hooks/useClickOutside";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef();

  // Hook para cerrar al hacer clic fuera
  useClickOutside(searchRef, () => setShowResults(false));

  // Buscar libros
  useEffect(() => {
    const searchBooks = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        setShowResults(false);
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
          setShowResults(true);
        }
      } catch (error) {
        console.error("Error searching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchBooks, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBookSelect = (book) => {
    setSearchQuery("");
    setShowResults(false);
    navigate(`/books/${book._id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleBookSelect(searchResults[0]);
    }
  };

  return (
    <Box position="relative" width="100%" maxWidth="500px" ref={searchRef}>
      <form onSubmit={handleSearchSubmit}>
        <InputGroup startElement={<LuSearch />}>
          <Input
            placeholder="Buscar libros por título, autor o ISBN..."
            value={searchQuery}
            rounded="full"
            onChange={handleSearchChange}
            onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
          />
        </InputGroup>
      </form>

      {/* Resultados de búsqueda */}
      {showResults && (
        <Portal>
          <Card.Root
            position="absolute"
            top="100%"
            left="0"
            right="0"
            marginTop="1"
            zIndex="dropdown"
            maxHeight="400px"
            overflowY="auto"
          >
            <Card.Body padding="0">
              {isLoading ? (
                <Box padding="4">
                  <AbsoluteCenter>
                    <Text color="fg.subtle">Buscando...</Text>
                  </AbsoluteCenter>
                </Box>
              ) : searchResults.length > 0 ? (
                <VStack gap="0" align="stretch">
                  {searchResults.map((book) => (
                    <Box
                      key={book._id}
                      padding="3"
                      cursor="pointer"
                      _hover={{ bg: "bg.subtle" }}
                      _notLast={{ borderBottom: "1px solid" }}
                      borderColor="border.subtle"
                      onClick={() => handleBookSelect(book)}
                    >
                      <HStack gap="3" align="start">
                        <Box
                          as="img"
                          src={book.cover}
                          alt={book.title}
                          width="40px"
                          height="60px"
                          objectFit="cover"
                          borderRadius="sm"
                          fallback={
                            <Box
                              width="40px"
                              height="60px"
                              bg="bg.subtle"
                              borderRadius="sm"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Text fontSize="xs" color="fg.subtle">
                                📚
                              </Text>
                            </Box>
                          }
                        />
                        <VStack align="start" gap="1" flex="1">
                          <Text
                            fontWeight="semibold"
                            fontSize="sm"
                            lineClamp="1"
                          >
                            {book.title}
                          </Text>
                          <Text fontSize="xs" color="fg.muted">
                            por {book.author}
                          </Text>
                          {book.genres && (
                            <Text fontSize="xs" color="fg.subtle" lineClamp="1">
                              {book.genres.join(", ")}
                            </Text>
                          )}
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Box padding="4">
                  <Text textAlign="center" color="fg.muted">
                    No se encontraron libros
                  </Text>
                </Box>
              )}
            </Card.Body>
          </Card.Root>
        </Portal>
      )}
    </Box>
  );
};

export default Search;
