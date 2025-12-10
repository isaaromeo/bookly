import { useBooklyApi } from "../hooks/useBooklyApi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  Heading,
  Image,
  Badge,
  Flex,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { LuUsers } from "react-icons/lu";
import {  useMemo } from "react";
import coverPlaceholder from "../assets/images/placeholder-cover.jpg";

const UserRecomend = () => {
  const navigate = useNavigate();
  const { data: isa } = useBooklyApi.useUser("68f26a93086e5c6b2e14f139");
  const { data: pedri } = useBooklyApi.useUser("68fd3eb969960b641fcd907d");
  const { data: books, loading: booksLoading } = useBooklyApi.useBooks();

  const getRandomBooks = (count, books = []) => {
  
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const recomendations = useMemo(() => {
    if (!books || books.length === 0) return [];

    if (isa?.library?.length >= 3 && pedri?.library?.length >= 3) {
      return [
        {
          user: isa.username,
          liked: isa.library.slice(0, 3),
          discovered: isa.library.slice(3, 6),
        },
        {
          user: pedri.username,
          liked: pedri.library.slice(0, 3),
          discovered: pedri.library.slice(3, 6),
        },
      ];
    }

    const shuffledBooks = getRandomBooks(12, books);
    return [
      {
        user: "BookLover",
        liked: shuffledBooks.slice(0, 3),
        discovered: shuffledBooks.slice(3, 6),
      },
      {
        user: "ReadingEnthusiast",
        liked: shuffledBooks.slice(6, 9),
        discovered: shuffledBooks.slice(9, 12),
      },
    ];
  }, [books, isa, pedri]);

  if (booksLoading) {
    return (
      <VStack gap="6" mb="8" paddingX="1rem">
        <Heading size={{ base: "lg", md: "xl" }} color="muted.200" textAlign="center">
          <LuUsers style={{ display: "inline", marginRight: "8px" }} />
          Community Discoveries
        </Heading>
        <Spinner size="lg" />
      </VStack>
    );
  }

  if (!books || books.length === 0) {
    return null; 
  }

  return (
    <VStack gap="6" mb="8" paddingX="1rem">
      <Heading
        size={{ base: "lg", md: "xl" }}
        textAlign="center"
        color="muted.200"
      >
        <LuUsers style={{ display: "inline", marginRight: "8px" }} />
        Community Discoveries
      </Heading>

      <Text
        fontSize={{ base: "sm", md: "lg" }}
        color="primary.200"
        textAlign="center"
        maxWidth="600px"
      >
        See what other readers are discovering based on their favorite books
      </Text>

      {recomendations.map((rec, index) => (
        <Card.Root
          key={index}
          width="100%"
          maxWidth="800px"
          variant="outline"
          bg="brand.900"
          borderColor="brand.900"
        >
          <Card.Body padding={{ base: "4", md: "6" }}>
            <VStack gap="4" align="stretch">
              <Text
                fontWeight="semibold"
                fontSize={{ base: "sm", md: "md" }}
                color="primary.100"
                textAlign="center"
              >
                Because{" "}
                <Badge
                  colorPalette="purple"
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  {rec.user}
                </Badge>{" "}
                liked these...
              </Text>

              <Flex
                direction={{ base: "column", sm: "row" }}
                gap={{ base: "3", sm: "4" }}
                align="center"
                justify="center"
              >
                <VStack gap="1" flex="1">
                  <SimpleGrid columns={3} gap="1">
                    {rec.liked.map((book, i) => (
                      <Box key={`${book._id}-liked-${i}`} position="relative">
                        <Badge
                          colorPalette="green"
                          fontSize={{ base: "2xs", sm: "xs" }}
                          position="absolute"
                          top="-10px"
                          left="50%"
                          transform="translateX(-50%)"
                          zIndex="1"
                          whiteSpace="nowrap"
                        >
                          Liked
                        </Badge>
                        <Image
                          src={book.cover}
                          alt={book.title}
                          width={{
                            base: "70px",
                            sm: "70px",
                            md: "80px",
                            lg: "90px",
                          }}
                          height={{
                            base: "90px",
                            sm: "90px",
                            md: "100px",
                            lg: "110px",
                          }}
                          borderRadius="sm"
                          objectFit="cover"
                          cursor="pointer"
                          onClick={() => navigate(`/books/${book._id}`)}
                          _hover={{
                            transform: "scale(1.05)",
                            transition: "transform 0.2s ease",
                          }}
                          boxShadow="5px 5px 5px rgba(138, 115, 143, 0.59)"
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                </VStack>

                <Box color="brand.500" fontSize="lg" fontWeight="bold">
                  →
                </Box>

                <VStack gap="1" flex="1">
                  <SimpleGrid columns={3} gap="1">
                    {rec.discovered.map((book, i) => (
                      <Box
                        key={`${book._id}-discovered-${i}`}
                        position="relative"
                      >
                        <Badge
                          colorPalette="blue"
                          fontSize={{ base: "2xs", sm: "xs" }}
                          position="absolute"
                          top="-10px"
                          left="50%"
                          transform="translateX(-50%)"
                          zIndex="1"
                          whiteSpace="nowrap"
                        >
                          New
                        </Badge>
                        <Image
                          src={book.cover || coverPlaceholder}
                          alt={book.title}
                          width={{
                            base: "70px",
                            sm: "70px",
                            md: "80px",
                            lg: "90px",
                          }}
                          height={{
                            base: "90px",
                            sm: "90px",
                            md: "100px",
                            lg: "110px",
                          }}
                          borderRadius="sm"
                          objectFit="cover"
                          cursor="pointer"
                          onClick={() => navigate(`/books/${book._id}`)}
                          _hover={{
                            transform: "scale(1.05)",
                            transition: "transform 0.2s ease",
                          }}
                          boxShadow="5px 5px 5px rgba(138, 115, 143, 0.59)"
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                </VStack>
              </Flex>

              <Text
                color="primary.100"
                fontWeight="bold"
                fontSize={{ base: "sm", md: "md" }}
                textAlign="center"
                display={{ base: "block" }}
                mt="2"
              >
                They discovered these gems!
              </Text>
            </VStack>
          </Card.Body>
        </Card.Root>
      ))}
    </VStack>
  );
};

export default UserRecomend;
