import {
  Box,
  Card,
  Text,
  Grid,
  VStack,
  HStack,
  RatingGroup
} from "@chakra-ui/react";



export const Tab = ({ content, tabTitle, contentType }) => {

  const renderReviews = () => (
    <VStack gap="4" align="stretch">
      {content.map((review) => (
        <Card.Root key={review._id} width="100%">
          <Card.Body>
            <HStack justify="space-between" mb="2">
              <VStack align="start" gap="1">
                <Text fontWeight="semibold">{review.title}</Text>
                <Text fontSize="sm" color="fg.muted">
                  on {review.book?.title || "Unknown Book"}
                </Text>
              </VStack>
              <RatingGroup.Root
                readOnly
                count={5}
                defaultValue={review.rating}
                size="sm"
                colorPalette="yellow"
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
            </HStack>
            <Text>{review.content}</Text>
            <Text fontSize="sm" color="fg.muted" mt="2">
              By {review.user?.username} •{" "}
              {new Date(review.createdAt).toLocaleDateString()}
            </Text>
          </Card.Body>
        </Card.Root>
      ))}
    </VStack>
  );

  const renderBooks = () => (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap="4">
      {content.map((book) => (
        <Card.Root key={book._id} cursor="pointer">
          <Card.Body>
            <img
              src={book.cover}
              alt={book.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <Text fontWeight="bold" mt="2">
              {book.title}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {book.author}
            </Text>
            {book.rating && (
              <HStack mt="1">
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
          </Card.Body>
        </Card.Root>
      ))}
    </Grid>
  );

  const renderEmpty = () => (
    <Text color="gray.500">
      There are no elements added to your {tabTitle}.
    </Text>
  );

    return (
      <Box>
        <Text fontSize="xl" mb="4">
          {tabTitle} ({content ? content.length : 0})
        </Text>

        {contentType === "books" && renderBooks()}
        {contentType === "reviews" && renderReviews()}
        {contentType === "empty" && renderEmpty()}
      </Box>
    );
}

export default Tab;