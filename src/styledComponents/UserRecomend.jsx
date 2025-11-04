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
  Flex
} from "@chakra-ui/react";
import { LuUsers } from "react-icons/lu";

const UserRecomend = () => {
  
    //pasar el data info por props para hacerlo mas flexible
  const navigate = useNavigate();
  const { data: isa } = useBooklyApi.useUser("68f26a93086e5c6b2e14f139"); 
  const { data: pedri } = useBooklyApi.useUser("68fd3eb969960b641fcd907d");

  const recomendations = [
    {
      user: isa?.username || "user1275942",
      liked: isa?.library?.slice(0, 3) || [],
      discovered: isa?.tbr?.slice(0, 3) || [],
    },
    {
      user: pedri?.username || "user8974540",
      liked: pedri?.library?.slice(0, 3) || [],
      discovered: pedri?.tbr?.slice(0, 3) || [],
    },
  ];

  return (
    <VStack gap="8" align="stretch" mb="12">
      <Heading size="xl">
        <LuUsers style={{ display: "inline", marginRight: "12px" }} />
        Community Discoveries
      </Heading>
      <Text fontSize="lg" color="fg.muted" maxWidth="800px">
        See what other readers are discovering based on their favorite books
      </Text>

      {recomendations.map((rec, index) => (
        <Card.Root key={index} variant="outline">
          <Card.Body>
            <VStack gap="4" align="stretch">
              <Text fontWeight="semibold" fontSize="lg">
                Because <Badge colorPalette="purple">{rec.user}</Badge> liked
                these...
              </Text>

              <Flex justify="space-between" align="center" gap="6">
                <HStack gap="3" flex="1" justify="center">
                  {rec.liked.map((book, i) =>
                    book ? (
                      <Box key={i} position="relative">
                        <Image
                          src={book.cover}
                          alt={book.title}
                          boxSize="80px"
                          borderRadius="md"
                          objectFit="cover"
                          boxShadow="sm"
                          cursor="pointer"
                          onClick={() => navigate(`/books/${book._id}`)}
                          _hover={{ transform: "scale(1.05)" }}
                          transition="transform 0.2s"
                        />
                        <Badge
                          size="sm"
                          colorPalette="green"
                          position="absolute"
                          top="-2"
                          right="-2"
                        >
                          Liked
                        </Badge>
                      </Box>
                    ) : null
                  )}
                </HStack>

                <Box color="brand.500" fontSize="xl" fontWeight="bold" px="4">
                  →
                </Box>

                <VStack align="end" gap="2" flex="1">
                  <HStack gap="3" justify="end">
                    {rec.discovered.map((book, i) =>
                      book ? (
                        <Box key={i} position="relative">
                          <Image
                            src={book.cover}
                            alt={book.title}
                            boxSize="80px"
                            borderRadius="md"
                            objectFit="cover"
                            boxShadow="sm"
                            cursor="pointer"
                            onClick={() => navigate(`/books/${book._id}`)}
                            _hover={{ transform: "scale(1.05)" }}
                            transition="transform 0.2s"
                          />
                          <Badge
                            size="sm"
                            colorPalette="blue"
                            position="absolute"
                            top="-2"
                            right="-2"
                          >
                            New!
                          </Badge>
                        </Box>
                      ) : null
                    )}
                  </HStack>
                  <Text color="brand.500" fontWeight="bold" fontSize="sm">
                    They discovered these gems!
                  </Text>
                </VStack>
              </Flex>
            </VStack>
          </Card.Body>
        </Card.Root>
      ))}
    </VStack>
  );
};

export default UserRecomend;