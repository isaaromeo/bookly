
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {
  Box,
  Grid,
  Card,
  Text,
  VStack,
  HStack,
  RatingGroup,
  Skeleton,
  Spinner
} from "@chakra-ui/react";
import coverPlaceholder from "../assets/images/placeholder-cover.jpg";

export const BookGrid = ({
  books,
  loading = false,
  onBookSelect,
  emptyMessage = "No books found",

}) => {
  const navigate = useNavigate();
  const memoizedBooks = useMemo(() => books || [], [books]);

  if (loading && (!books || books.length === 0)) {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="6">
      {[...Array(8)].map((_, i) => (
        <Card.Root key={i} borderColor="brand.900">
          <Card.Body bg="brand.900">
            <Skeleton height="300px" borderRadius="8px" mb="4" bg="muted.300" />
            <Skeleton height="4" mb="2" width="80%" />
            <Skeleton height="3" mb="3" width="60%" />
            <Skeleton height="3" width="90%" />
          </Card.Body>
        </Card.Root>
      ))}
    </Grid>
  );
}

  if (!memoizedBooks.length) {
    return (
      <Box textAlign="center" py="12">
        <Text fontSize="lg" color="muted.100">
          {emptyMessage}
        </Text>
      </Box>
    );
  }

  return (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(auto-fill, minmax(180px, 1fr))", // auto-fill en lugar de auto-fit
        xl: "repeat(auto-fill, minmax(200px, 1fr))",
      }}
      gap="4"
      justifyItems={{
        base: "center",
        sm: "center",
        md: "start",
        lg: "start",
      }}
      width="100%"
    >
      {memoizedBooks.map((book) => (
        <Card.Root
          key={book._id}
          cursor="pointer"
          onClick={() =>
            onBookSelect ? onBookSelect(book) : navigate(`/books/${book._id}`)
          }
          _hover={{
            transform: "translateY(-4px)",
            boxShadow: "xl",
            borderColor: "brand.200",
          }}
          transition="all 0.3s ease-in-out"
          bg="brand.800"
          borderColor="brand.800"
          width="95%"
          maxWidth={{
            base: "180px",
            sm: "180px",
            md: "200px",
            lg: "250px",
          }}
        >
          <Card.Body
            padding={{ base: "2", md: "3" }}
            display="flex"
            flexDirection="column"
            height="100%"
          >
            <Box
              as="img"
              src={book.cover || coverPlaceholder}
              alt={book.title}
              width="100%"
              height={{
                base: "150px",
                sm: "150px",
                md: "250px",
                lg: "250px",
              }}
              objectFit="cover"
              borderRadius="8px"
              mb="4"
            />

            <VStack align="start" gap="2">
              <Text
                fontWeight="bold"
                fontSize={{
                  base: "1rem",
                  sm: "md",
                  md: "lg",
                  lg: "lg",
                }}
                lineClamp="2"
                color="white"
              >
                {book.title}
              </Text>

              <Text
                color="muted.100"
                fontSize={{
                  base: "xs",
                  sm: "xs",
                  md: "md",
                  lg: "md",
                }}
                lineClamp="1"
              >
                {book.author}
              </Text>

              <HStack gap="0" width="100%">
                <Box
                  transform={{
                    base: "scale(0.8)",
                    sm: "scale(1)",
                    md: "scale(1)",
                    lg: "scale(1)",
                  }}
                  transformOrigin="left center"
                  margin={{ base: "0" }}
                >
                  <RatingGroup.Root
                    readOnly
                    count={5}
                    defaultValue={book.rating}
                    size={{
                      base: "xs",
                      sm: "sm",
                      md: "sm",
                      lg: "sm",
                    }}
                    colorPalette="yellow"
                  >
                    <RatingGroup.HiddenInput />
                    <RatingGroup.Control />
                  </RatingGroup.Root>
                </Box>

                <Text
                  fontSize={{
                    base: "0.6rem",
                    sm: "xs",
                    md: "sm",
                    lg: "sm",
                  }}
                  color="muted.100"
                >
                  ({book.rating}/5)
                </Text>
              </HStack>

              {book.genres && book.genres.length > 0 && (
                <Text
                  fontSize="sm"
                  color="muted.300"
                  lineClamp="2"
                  height="2.5rem"
                >
                  {book.genres.join(", ")}
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
