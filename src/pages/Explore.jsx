import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Spinner,
  Alert,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Link,
  Separator,
  GridItem,
} from "@chakra-ui/react";
import BookGrid from "../styledComponents/BookGrid2";
import UserRecomend from "../styledComponents/UserRecomend";
import headerImage from "../assets/headerOK.png";
import { useBooklyApi } from "../hooks/useBooklyApi";
import styled from "styled-components";

const HeroSection = styled.section`
  background-image: linear-gradient(
      0deg,
      rgba(133, 120, 171, 0) 0%,
      rgba(133, 120, 171, 0.88) 100%
    ),
    url(${headerImage});
  background-repeat: repeat-x;
  background-position: bottom;
  text-align: center;
  width: 100%;
  padding: 4rem 1rem;
  margin-top: 2rem;
  border-radius: 20px;
`;
  const categories = [
    "Fantasy",
    "History",
    "Horror",
    "Adventure",
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
        <Heading size="lg" id={title.toLowerCase().replace(/\s+/g, "-")}>
          {title}
        </Heading>
        <Button variant="ghost" size="sm">
          See All
        </Button>
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
        <Container maxWidth="1200px">
          <Heading size="2xl" textAlign="center">
            Explore Our Library
          </Heading>
          <Text
            fontSize="lg"
            color="fg.muted"
            textAlign="center"
            maxWidth="600px"
          >
            Dive into our vast collection of books, discover community
            favorites, and find your next great read
          </Text>
        </Container>
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
