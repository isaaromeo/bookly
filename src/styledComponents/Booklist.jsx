import {
  Box,
  Card,
  Text,
  VStack,
  HStack,
  Avatar,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { LuBook } from "react-icons/lu";

import { useNavigate } from "react-router-dom";

export const BookList = ({books}) => {
    const navigate = useNavigate();

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
      
    >
      <Card.Body padding="0">
        <VStack gap="0" align="stretch">
          {books.map((book) => (
            <Box
              key={book._id}
              padding="3"
              cursor="pointer"
              borderColor="border.subtle"
              onClick={() => {
                navigate(`/books/${book._id}`);
              }}
            >
              <HStack gap="3" align="start">
                {/* Book cover */}
                <Avatar.Root size="sm" shape="square" flexShrink="0">
                  <Avatar.Fallback>
                    <LuBook />
                  </Avatar.Fallback>
                  <Avatar.Image src={book.cover} alt={book.title} />
                </Avatar.Root>

                {/* Book info */}
                <VStack align="start" gap="1" flex="1" minWidth="0">
                  <Text
                    fontWeight="semibold"
                    fontSize="sm"
                    lineClamp="1"
                    color="fg.emphasized"
                  >
                    {book.title}
                  </Text>
                  <Text fontSize="xs" color="fg.muted" lineClamp="1">
                    by {book.author}
                  </Text>
                  {book.genres && book.genres.length > 0 && (
                    <Text fontSize="xs" color="fg.subtle" lineClamp="1">
                      {book.genres.join(", ")}
                    </Text>
                  )}
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

// Variantes predefinidas
BookList.Variants = {
  Dropdown: (props) => (
    <Card.Root
      position="absolute"
      top="100%"
      left="0"
      right="0"
      marginTop="1"
      zIndex="dropdown"
      maxHeight="400px"
      overflowY="auto"
      boxShadow="lg"
      {...props}
    >
      <Card.Body padding="0">
        <BookList {...props} />
      </Card.Body>
    </Card.Root>
  ),

  Inline: (props) => (
    <Box
      border="1px solid"
      borderColor="border.subtle"
      borderRadius="md"
      overflow="hidden"
      {...props}
    >
      <BookList {...props} />
    </Box>
  ),
};

export default BookList;
