import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import BookGrid from "../styledComponents/BookGrid";
import { useCategoryBooks } from "../hooks/useCategoryBooks";
import styled from "styled-components";

const HeroSection = styled.div`
  background: linear-gradient(135deg, #836e99 0%, #45385a 100%);
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 3rem;
`;

const genres = ["fantasy", "adventure", "romance"]

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

  const featuredBooks = books?.slice(0, 3) || [];

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


  const fantasy = useCategoryBooks("fantasy");
  const adventure = useCategoryBooks("adventure");
  const romance = useCategoryBooks("romance");
 //TODO version de useCateory con cache tarda mucho en cargar

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


      <Box padding="6" maxWidth="1200px" margin="0 auto">
        <VStack gap="8" align="stretch">

          <CategorySection
            title="Fantasy"
            books={fantasy.results}
            loading={fantasy.loading}
            error={fantasy.error}
            onBookSelect={handleBookSelect}
          />


          <CategorySection
            title="Adventure"
            books={adventure.results}
            loading={adventure.loading}
            error={adventure.error}
            onBookSelect={handleBookSelect}

          />

          <CategorySection
            title="Romance"
            books={romance.results}
            loading={romance.loading}
            error={romance.error}
            onBookSelect={handleBookSelect}

          />

        </VStack>
      </Box>
    </Box>
  );
};

export default Explore;
