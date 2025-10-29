import { useNavigate} from "react-router-dom";
import { useMemo } from "react";

import {
  Box,
  Grid,
  Card,
  Text,
  VStack,
  HStack,
  Spinner,
  RatingGroup,
} from "@chakra-ui/react";
import { LuBook } from "react-icons/lu";

export const BookGrid = ({books}) => {
    const navigate = useNavigate();
    const memoizedBooks = useMemo(() => books || [], [books]);

     if (!memoizedBooks.length) {
       return (
         <Box textAlign="center" py="8">
           <Text fontSize="lg" color="fg.muted">
             No books found
           </Text>
         </Box>
       );
     }


  return (
    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="6">
      {memoizedBooks.map((book) => (
        <Card.Root
          key={book._id}
          cursor="pointer"
          height="100%"
          onClick={() => {
            navigate(`/books/${book._id}`);
          }}
          bg="brand.800"
        >
          <Card.Body>
            <Box
              as="img"
              src={book.cover}
              alt={book.title}
              maxHeight="200px"
              height="100%"
              objectFit="cover"
              borderRadius="md"
              marginBottom="3"
            />

            <VStack align="start" gap="2" flex="1">
              <Text
                fontWeight="bold"
                fontSize="md"
                lineClamp="2"
                height="2.5rem"
              >
                {book.title}
              </Text>

              <Text fontSize="sm" color="fg.muted" lineClamp="1">
                by {book.author}
              </Text>

              {/* Rating */}
              {book.rating && (
                <HStack gap="1" width="100%">
                  <RatingGroup.Root
                    readOnly
                    count={5}
                    defaultValue={book.rating}
                    size="sm"
                    colorPalette="yellow"
                  >
                    <RatingGroup.HiddenInput />
                    <RatingGroup.Control />
                  </RatingGroup.Root>
                  <Text fontSize="xs" color="fg.muted">
                    ({book.rating})
                  </Text>
                </HStack>
              )}

              {/* Genres */}
              {book.genres && book.genres.length > 0 && (
                <Text fontSize="xs" color="fg.subtle" lineClamp="1">
                  {book.genres.slice(0, 2).join(", ")}
                </Text>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>
      ))}
    </Grid>
  );
};

export default BookGrid;
