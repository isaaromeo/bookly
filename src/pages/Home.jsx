
import { useBooklyApi } from "../hooks/useBooklyApi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Text,
  VStack,
  HStack,
  Stack,
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
  Spinner,
  Flex,
  Highlight,
  Container
} from "@chakra-ui/react";
import {
  LuBook,
  LuHouse,
  LuTrendingUp,
  LuUserPlus,
  LuUsers,
  LuStar,
  LuMoveUpRight
} from "react-icons/lu";
import BookGrid from "../styledComponents/BookGrid2";
import headerImage from "../assets/headerOK.png";
import FeatureCard from "../styledComponents/FeatureCard";

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

const features = [
    {
      icon: <LuBook />,
      title: "Track Your Reading",
      description: "Keep track of books you've read and want to read"
    },
    {
      icon: <LuUsers />,
      title: "Join Community",
      description: "Connect with fellow book lovers and share insights"
    },
    {
      icon: <LuStar />,
      title: "Rate & Review",
      description: "Share your thoughts and discover new perspectives"
    },
    {
      icon: <LuTrendingUp />,
      title: "Discover Trends",
      description: "See what's popular and find your next favorite read"
    }
  ];

    const userFeedback = [
      {
        quote:
          "Bookly has completely transformed how I discover and track my reading. The community recommendations are spot on!",
        author: "Sarah M.",
        role: "Avid Reader",
      },
      {
        quote:
          "As a book club organizer, this platform has made it so easy to find books and discuss them with my group.",
        author: "Michael T.",
        role: "Book Club Leader",
      },
      {
        quote:
          "The reading challenges and tracking features have helped me read more consistently than ever before.",
        author: "Jessica L.",
        role: "Casual Reader",
      },
    ];

const Home = () => {

  const { data: books, loading, error } = useBooklyApi.useBooks();
  const navigate = useNavigate();

  //TODO filtrar de forma real
  const featuredBooks = books?.slice(0, 10) || [];
  const trendingBooksList = books?.slice(0, 8) || [];
  const newReleases = books?.slice(8, 16) || [];

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

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="1200px">
          <VStack gap="6" color="white">
            <Heading
              fontSize="4xl"
              fontWeight="bold"
              style={{
                fontWeight: "bold",
                fontFamily: "'Cinzel', serif",
              }}
            >
              Discover Your Next Favorite Book
            </Heading>
            <Text
              fontSize="xl"
              color="secondary.200"
              opacity="0.9"
              maxWidth="600px"
            >
              Join thousands of readers tracking their journey, sharing reviews,
              and exploring new literary worlds together.
            </Text>
            <HStack gap="4" mt="4">
              <Button
                size="lg"
                colorPalette="white"
                variant="outline"
                onClick={() => navigate("/books")}
              >
                <LuBook style={{ marginRight: "8px" }} />
                Explore Books
              </Button>
              <Button
                size="lg"
                variant="solid"
                bg="brand.50"
                color="brand.600"
                onClick={() => navigate("/register")}
              >
                Join Community
              </Button>
            </HStack>
          </VStack>
        </Container>
      </HeroSection>

      <Container maxWidth="1200px" py="8">
        <VStack gap="12" mb="12">
          <VStack gap="4" align="start" width="100%">
            <Heading size="xl" textAlign="left">
              Why Book Lovers Choose Bookly
            </Heading>
            <Text
              fontSize="lg"
              color="fg.muted"
              maxWidth="600px"
              textAlign="left"
            >
              Everything you need to enhance your reading experience in one
              beautiful platform
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6" width="100%">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </SimpleGrid>
        </VStack>
        <VStack gap="8" mb="12">
          {realRecommendations.map((rec, index) => (
            <Box
              key={index}
              bg="primary.900"
              borderRadius="xl"
              p={6}
              boxShadow="md"
              width="100%"
              opacity={0.8}
            >
              <Grid templateColumns="1fr auto 1fr" gap={6} alignItems="center">
                <VStack align="start" gap={2}>
                  <Text
                    fontWeight="semibold"
                    textAlign="left"
                    color="primary.100"
                    mb={4}
                  >
                    Because{" "}
                    <Text
                      as="span"
                      color="secondary.500"
                      fontWeight="bold"
                      marginBottom={0}
                    >
                      {rec.user}
                    </Text>{" "}
                    liked...
                  </Text>

                  <HStack justify="start" gap={3}>
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
                          cursor="pointer"
                          onClick={() => navigate(`/books/${book._id}`)}
                        />
                      ) : null
                    )}
                  </HStack>
                </VStack>

                <Box color="primary.400" fontSize="2xl" textAlign="center">
                  <LuMoveUpRight />
                </Box>

                <VStack align="end" gap={2}>
                  <HStack justify="end" gap={3} marginBottom="6px">
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
                          cursor="pointer"
                          onClick={() => navigate(`/books/${book._id}`)}
                        />
                      ) : null
                    )}
                  </HStack>
                  <Text color="primary.100" fontWeight="bold">
                    They discovered!
                  </Text>
                </VStack>
              </Grid>
            </Box>
          ))}
        </VStack>
        <VStack gap="6" mb="12" align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">
              <LuTrendingUp
                style={{ display: "inline", marginRight: "12px" }}
              />
              Trending Now
            </Heading>
            <Button variant="ghost" onClick={() => navigate("/books")}>
              View All
            </Button>
          </HStack>
          <BookGrid
            books={trendingBooksList}
            loading={loading}
            onBookSelect={handleBookSelect}
          />
        </VStack>

        <VStack gap="8" mb="12">
          <Heading size="xl" color="brand.50" textAlign="center">
            What Readers Say
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="6" width="100%">
            {userFeedback.map((feedback, index) => (
              <Blockquote.Root key={index}>
                <Card.Root bg="brand.700" variant="outline" height="100%">
                  <Card.Body bg="brand.500" borderRadius="20px">
                    <Blockquote.Content
                      as="div"
                      mb="4"
                      color="brand.900"
                      sx={{
                        fontWeight: "bold !important",
                        fontStyle: "normal", // Por si acaso quita la italic
                      }}
                    >
                      {feedback.quote}
                    </Blockquote.Content>
                    <Blockquote.Caption>
                      <Text fontWeight="semibold" color="primary.900">
                        {feedback.author}
                      </Text>
                      <Text fontSize="sm" color="primary.900">
                        {feedback.role}
                      </Text>
                    </Blockquote.Caption>
                  </Card.Body>
                </Card.Root>
              </Blockquote.Root>
            ))}
          </SimpleGrid>
        </VStack>

        <Card.Root bg="secondary.100" mb="12" opacity={0.4} borderRadius="15px">
          <Card.Body>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap="6" textAlign="center">
              <VStack>
                <Heading
                  size="3xl"
                  color="brand.300"
                  sx={{
                    fontWeight: "bold",
                    fontStyle: "normal",
                  }}
                >
                  10K+
                </Heading>
                <Text color="primary.800">Active Readers</Text>
              </VStack>
              <VStack>
                <Heading size="3xl" color="brand.400">
                  50K+
                </Heading>
                <Text color="primary.800">Books Reviewed</Text>
              </VStack>
              <VStack>
                <Heading size="3xl" color="brand.600">
                  1M+
                </Heading>
                <Text color="primary.800">Books Tracked</Text>
              </VStack>
              <VStack>
                <Heading size="3xl" color="brand.900">
                  5K+
                </Heading>
                <Text color="primary.800">Reading Clubs</Text>
              </VStack>
            </SimpleGrid>
          </Card.Body>
        </Card.Root>
      </Container>
      <Text
        fontWeight="bold"
        style={{ border: "2px solid red" }}
        data-test="font-weight-test"
      >
        TEST - Este texto debería ser BOLD
      </Text>
      <Text fontWeight="bold" style={{ border: "2px solid red" }}>
        Inspecciona este elemento - ¿Tiene [font-weight="bold"]?
      </Text>
      <div>
        <Text fontWeight="thin">thin (100)</Text>
        <Text fontWeight="light">light (300)</Text>
        <Text fontWeight="normal">normal (400)</Text>
        <Text fontWeight="medium">medium (500)</Text>
        <Text fontWeight="semibold">semibold (600)</Text>
        <Text data-fontweight="bold">bold (700)</Text>
        <Text fontWeight="extrabold">extrabold (800)</Text>
        <Text fontWeight="black">black (900)</Text>
      </div>
    </Box>
  );
};

export default Home;
