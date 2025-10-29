
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Text,
  VStack,
  HStack,
  Grid,
  RatingGroup,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Link,
  Separator,
  GridItem,
  Blockquote,
  Spinner
} from "@chakra-ui/react";
import {
  LuBook,
  LuHouse,
  LuUserPlus,

} from "react-icons/lu";
import BookGrid from "../styledComponents/BookGrid";
import headerImage from "../assets/headerOK.png";
import DiscoverContent from "../styledComponents/DiscoverContent";

import styled from "styled-components";

// Hero section que ocupa todo el ancho
const HeroSection = styled.section`
  background: ${(props) =>
    props.theme?.colors?.app?.cardHeaderBackground || "#ffffff"};
  text-align: center;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;

const HeroContent = styled.div`
  background: ${(props) =>
    props.theme?.colors?.app?.cardHeaderBackground || "#ffffff"};
  background-image: url(${headerImage});
  background-repeat: repeat-x;
  background-position: bottom;
  text-align: center;
  align-self: center;
  width: 100%;
  display: flex;
  flex-direction: column;

`;

const DiscoverSection = styled.div`
  background: transparent;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 5rem;
`;

const Home = () => {
  //Con nuevo hook useApi general
  const { data: books, loading, error } = useBooklyApi.useBooks();
  const navigate = useNavigate();

  const isaId = "68f26a93086e5c6b2e14f139";
  const pedriId = "68fd3eb969960b641fcd907d";
  const {
    data: dataIsa,
    loading: loadingIsa,
    error: errorIsa,
  } = useBooklyApi.useUser(isaId);

  const {
    data: dataPedri,
    loading: loadingPedri,
    error: errorPedri,
  } = useBooklyApi.useUser(pedriId);

  const handleBookSelect = (book) => {
    navigate(`/books/${book._id}`);
  };

  const realRecommendations = [
    {
      user: dataIsa?.username || "Isa",
      liked: dataIsa?.library?.slice(0, 3) || [],
      discovered: dataIsa?.library?.slice(0, 3) || [],
    },
    {
      user: dataPedri?.username || "Pedri",
      liked: dataPedri?.library?.slice(0, 3) || [],
      discovered: dataPedri?.library?.slice(0, 3) || [],
    },
  ];

  // DEBUG: Ver qué datos tenemos
  console.log("Data Isa:", dataIsa);
  console.log("Data Pedri:", dataPedri);
  console.log("Isa library:", dataIsa?.library);
  console.log("Pedri library:", dataPedri?.library);

  if (loading || loadingIsa || loadingPedri) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="50vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error || errorIsa || errorPedri) {
    return (
      <Box textAlign="center" py="8">
        <Text color="red.500">Error loading data</Text>
      </Box>
    );
  }

  const featuredBooks = books.slice(0, 8);
  return (
    <Box>
      <HeroSection>
        <HeroContent>
          <DiscoverSection>
            <Text fontSize="4xl" fontWeight="bold" color="secondary.500" mb="4">
              Discover your next book obsession!
            </Text>
            <Text fontSize="xl" color="secondary.200" mb="6" opacity="0.9">
              Find recomendtion, share your reviews and connect with other
              readers.
            </Text>
          </DiscoverSection>
          <Box bg="bg.canvas" padding="4">
            <Button
              size="lg"
              bg="secondary.700"
              variant="subtle"
              borderColor="secondary.900"
              color="brand.900"
              onClick={() => navigate("/books")}
            >
              <LuBook />
              Explore Books
            </Button>
          </Box>
        </HeroContent>
      </HeroSection>

      <Box mt={20} px={8}>
        <Heading size="xl" mb={6} color="primary.900" textAlign="left">
          What will you discover?
        </Heading>

        <VStack spacing={10}>
          {realRecommendations.map((rec, index) => (
            <Box
              key={index}
              bg="primary.500"
              borderRadius="xl"
              p={6}
              boxShadow="md"
              width="100%"
              opacity={0.6}
            >
              <Text
                fontWeight="semibold"
                textAlign="left"
                color="secondary.900"
                mb={3}
              >
                Because {rec.user} liked...
              </Text>
              <HStack justify="center" mb={4}>
                {rec.liked.map((book, i) =>
                  book ? (
                    <Image
                      key={i}
                      src={book.cover}
                      alt={book.title}
                      boxSize="100px"
                      borderRadius="md"
                      objectFit="cover"
                      boxShadow="sm"
                      margin={3}
                      cursor="pointer"
                      onClick={() => navigate(`/books/${book._id}`)}
                    />
                  ) : null
                )}
                <Text fontSize="2xl" color="secondary.400">
                  ➜
                </Text>
                <HStack justify="center" mb={4}>
                  {rec.discovered.map((book, i) =>
                    book ? (
                      <Image
                        key={i}
                        src={book.cover}
                        alt={book.title}
                        boxSize="100px"
                        borderRadius="md"
                        objectFit="cover"
                        boxShadow="sm"
                        margin={3}
                        cursor="pointer"
                        onClick={() => navigate(`/books/${book._id}`)}
                      />
                    ) : null
                  )}
                  <Text color="primary.900" fontWeight="bold">
                    They discovered!
                  </Text>
                </HStack>
              </HStack>
            </Box>
          ))}
          <SimpleGrid
            columns={[2, 3, 5]}
            mt={10}
            mb={10}
            justifyContent="center"
            justifyItems="center"
          >
            <Blockquote.Root>
              <Blockquote.Content cite="Uzumaki Naruto">
                If anyone thinks he is something when he is nothing, he deceives
                himself. Each one should test his own actions. Then he can take
                pride in himself, without comparing himself to anyone else.
              </Blockquote.Content>
              <Blockquote.Caption>
                — <cite>Uzumaki Naruto</cite>
              </Blockquote.Caption>
            </Blockquote.Root>

            <Blockquote.Root>
              <Blockquote.Content cite="Uzumaki Naruto">
                If anyone thinks he is something when he is nothing, he deceives
                himself. Each one should test his own actions. Then he can take
                pride in himself, without comparing himself to anyone else.
              </Blockquote.Content>
              <Blockquote.Caption>
                — <cite>Uzumaki Naruto</cite>
              </Blockquote.Caption>
            </Blockquote.Root>
            <Blockquote.Root>
              <Blockquote.Content cite="Uzumaki Naruto">
                If anyone thinks he is something when he is nothing, he deceives
                himself. Each one should test his own actions. Then he can take
                pride in himself, without comparing himself to anyone else.
              </Blockquote.Content>
              <Blockquote.Caption>
                — <cite>Uzumaki Naruto</cite>
              </Blockquote.Caption>
            </Blockquote.Root>

            <Blockquote.Root>
              <Blockquote.Content cite="Uzumaki Naruto">
                If anyone thinks he is something when he is nothing, he deceives
                himself. Each one should test his own actions. Then he can take
                pride in himself, without comparing himself to anyone else.
              </Blockquote.Content>
              <Blockquote.Caption>
                — <cite>Uzumaki Naruto</cite>
              </Blockquote.Caption>
            </Blockquote.Root>
          </SimpleGrid>
        </VStack>
      </Box>
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <Box bg="primary.500">rowSpan=2</Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box bg="primary.500">colSpan=2</Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box bg="primary.500">colSpan=2</Box>
        </GridItem>
        <GridItem colSpan={4}>
          <Box bg="primary.500">colSpan=4</Box>
        </GridItem>
      </Grid>

      <Box minHeight="100vh" bg="bg.canvas" padding="6">
        <BookGrid books={featuredBooks} onBookSelect={handleBookSelect} />
      </Box>
    </Box>
  );
};

export default Home;
