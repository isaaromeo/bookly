import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Spinner,
  Alert,
  Card,
  Grid,
  RatingGroup,
  Heading,
  Image,
  SimpleGrid,
  Link,
  Separator,
  GridItem,
} from "@chakra-ui/react";
import BookGrid from "../styledComponents/BookGrid";
import { useBooklyApi } from "../hooks/useBooklyApi";
import styled from "styled-components";

const HeroSection = styled.div`
  background: linear-gradient(135deg, #836e99 0%, #45385a 100%);
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 3rem;
`;
  const categories = [
    "Fantasy",
    "History",
    "Horror",
    "Romance",
    "Sci-fi",
    "Thriller",

  ];

const CategorySection = ({
  title,
  books,
  loading,
  error,
  onBookSelect,
}) => {
  if (error) {
    return (
      <Alert.Root status="error" mb="6">
        <Alert.Indicator />
        <Alert.Title>
          Error loading: {error}
        </Alert.Title>
      </Alert.Root>
    );
  }

  const featuredBooks = books?.slice(0, 4) || [];

  return (
    <VStack gap="6" align="stretch" mb="8">
      <HStack justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          {title}
        </Text>

      </HStack>

      {loading ? (
        <Box display="flex" justifyContent="center" padding="8">
          <Spinner size="lg" />
        </Box>
      ) : (
        <BookGrid
          books={featuredBooks}
          onBookSelect={onBookSelect}
          emptyMessage={`No ${title.toLowerCase()} books found`}
        />
      )}
    </VStack>
  );
};

const Explore = () => {
  const navigate = useNavigate();


 //Con nuevo hook useApi general
 const {
   data: fantasyBooks,
   loading: fantasyLoading,
   error: fantasyError,
 } = useBooklyApi.useBooksByGenre("fantasy");
 const {
   data: adventureBooks,
   loading: adventureLoading,
   error: adventureError,
 } = useBooklyApi.useBooksByGenre("adventure");
 const {
   data: romanceBooks,
   loading: romanceLoading,
   error: romanceError,
 } = useBooklyApi.useBooksByGenre("romance");

  const handleBookSelect = (book) => {
    navigate(`/books/${book._id}`);
  };


  return (
    <Box minHeight="100vh" bg="bg.canvas">
      <HeroSection>
        <Text fontSize="4xl" fontWeight="bold" color="white" mb="4">
          Discover New Worlds
        </Text>
        <Text fontSize="xl" color="white" opacity="0.9">
          Explore books by your favorite genres
        </Text>
      </HeroSection>

      <Heading size="md" mb={4} color="primary.600">
        Browse by Category
      </Heading>
      <SimpleGrid columns={[2, 3, 5]} spacing={4} mb={10}>
        {categories.map((cat) => (
          <Link
            key={cat}
            color="secondary.500"
            _hover={{ color: "primary.400", textDecoration: "underline" }}
            fontWeight="medium"
          >
            {cat}
          </Link>
        ))}
      </SimpleGrid>

      <Box padding="6" maxWidth="1200px" margin="0 auto">
        <VStack gap="8" align="stretch">
          <CategorySection
            title="Fantasy"
            books={fantasyBooks}
            loading={fantasyLoading}
            error={fantasyError}
            onBookSelect={handleBookSelect}
          />

          <CategorySection
            title="Adventure"
            books={adventureBooks}
            loading={adventureLoading}
            error={adventureError}
            onBookSelect={handleBookSelect}
          />

          <CategorySection
            title="Romance"
            books={romanceBooks}
            loading={romanceLoading}
            error={romanceError}
            onBookSelect={handleBookSelect}
          />
        </VStack>
      </Box>
    </Box>
  );
};

export default Explore;
