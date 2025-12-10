import {
  Box,
  Card,
  Text,
  VStack,
  HStack,
  Avatar,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { LuBook } from "react-icons/lu";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const BookList = ({ books, loading = false }) => {
  const navigate = useNavigate();
  const memoizedBooks = useMemo(() => books || [], [books]);

  return (
    <Card.Root
      position="absolute"
      top="100%"
      left="0"
      right="0"
      marginTop="1"
      zIndex="dropdown"
      maxHeight="400px"
      overflowY="auto"
      borderColor="muted.100"
    >
      <Card.Body padding="0">
        {loading ? (
          <VStack gap="3" padding="2" bg="brand.900">
            <Spinner size="md" color="brand.500" />
            <Text fontSize="sm" color="muted.100">
              Searching books...
            </Text>
          </VStack>
        ) : memoizedBooks.length > 0 ? (
          <VStack gap="0" align="stretch">
            {memoizedBooks.map((book) => (
              <Box
                key={book._id}
                padding="3"
                cursor="pointer"
                border="solid 2px"
                borderColor="brand.700"
                onClick={() => {
                  navigate(`/books/${book._id}`);
                }}
                bg="brand.900"
                _hover={{
                  bg: "brand.800",
                }}
                transition="background-color 0.2s ease"
              >
                <HStack gap="3" align="start">
                  <Avatar.Root size="sm" shape="square" flexShrink="0">
                    <Avatar.Fallback>
                      <LuBook />
                    </Avatar.Fallback>
                    <Avatar.Image src={book.cover} alt={book.title} />
                  </Avatar.Root>

                  <VStack align="start" gap="1" flex="1" minWidth="0">
                    <Text
                      fontWeight="semibold"
                      fontSize="sm"
                      lineClamp="1"
                      color="muted.200"
                    >
                      {book.title}
                    </Text>
                    <Text fontSize="xs" color="muted.100" lineClamp="1">
                      by {book.author}
                    </Text>
                    {book.genres && book.genres.length > 0 && (
                      <Text fontSize="xs" color="muted.300" lineClamp="1">
                        {book.genres.join(", ")}
                      </Text>
                    )}
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        ) : (
          <VStack padding="6" bg="brand.900">
            <Text fontSize="sm" color="fg.muted">
              No books found :(
            </Text>
          </VStack>
        )}
      </Card.Body>
    </Card.Root>
  );
};

export default BookList;
