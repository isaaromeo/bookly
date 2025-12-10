import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Text,
  Spinner,
  Alert,
 
} from "@chakra-ui/react";
import { LuArrowLeft, LuHouse, LuChevronRight } from "react-icons/lu";
import BookGrid from "../styledComponents/BookGrid";
import { useBooklyApi } from "../hooks/useBooklyApi";

export const GenreResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const genre = searchParams.get("genre") || "";

  const {
    data: genreBooks,
    loading,
    error,
  } = useBooklyApi.useBooksByGenre(genre);

  useEffect(() => {
    if (!genre) {
      navigate("/books");
      return;
    }
  }, [genre, navigate]);

  const handleBookSelect = (book) => {
    navigate(`/books/${book._id}`);
  };

  const formatedGenre = genre
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  

    if (loading) {
      return (
        <Box
          minHeight="100vh"
          bg="bg.canvas"
          padding="6"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" />
        </Box>
      );
    }
  
    
    if (error) {
      return (
        <Box minHeight="100vh" bg="bg.canvas" padding="6">
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>Error searching books: {error}</Alert.Title>
          </Alert.Root>
        </Box>
      );
    }
  
    return (
      <Box minHeight="100vh" bg="bg.canvas" padding="6">
        <Text fontSize="xl" color="muted.100" mb="4" fontWeight="semibold" textAlign="left">
          Search Results for "{formatedGenre}"
        </Text>
        <BookGrid
          books={genreBooks}
          loading={loading}
          onBookSelect={handleBookSelect}
          emptyMessage={`No books found for "${formatedGenre}". Try another search!`}
        />
      </Box>
    );
  };
export default GenreResults;
