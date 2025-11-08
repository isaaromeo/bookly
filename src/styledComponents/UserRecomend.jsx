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
} from "@chakra-ui/react";
import { LuUsers, LuArrowRight } from "react-icons/lu";

//TODO poner placeholder data porque el data de los users solo sale si estas loggeado 
const UserRecomend = () => {
  const navigate = useNavigate();
  const { data: isa } = useBooklyApi.useUser("68f26a93086e5c6b2e14f139");
  const { data: pedri } = useBooklyApi.useUser("68fd3eb969960b641fcd907d");

  const recomendations = [
    {
      user: isa?.username || "user1275942",
      liked: isa?.library?.slice(0, 3) || [],
      discovered: isa?.library?.slice(3, 6) || [],
    },
    {
      user: pedri?.username || "user8974540",
      liked: pedri?.library?.slice(0, 3) || [],
      discovered: pedri?.library?.slice(3, 6) || [],
    },
  ];

  return (
    <VStack gap="6" mb="8" paddingX="1rem">
      <Heading size={{ base: "lg", md: "xl" }} textAlign="center">
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
                    {rec.liked.map((book, i) =>
                      book ? (
                        <Box key={i} position="relative">
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
                          />
                        </Box>
                      ) : null
                    )}
                  </SimpleGrid>
                </VStack>

                <Box color="brand.500" fontSize="lg" fontWeight="bold">
                  →
                </Box>

                <VStack gap="1" flex="1">
                  
                  <SimpleGrid columns={3} gap="1">
                    {rec.discovered.map((book, i) =>
                      book ? (
                        <Box key={i} position="relative">
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
                          />
                        </Box>
                      ) : null
                    )}
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
