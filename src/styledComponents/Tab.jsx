import {
  Box,
  Card,
  Text,
  Grid,
} from "@chakra-ui/react";

export const Tab = ({ content, tabTitle }) => {
    return (
      <Box>
        <Text fontSize="xl" mb="4">
          {tabTitle}
        </Text>
        {content && content.length > 0 ? (
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
                </Card.Body>
              </Card.Root>
            ))}
          </Grid>
        ) : (
          <Text color="gray.500">
            There are no elements added to your {tabTitle}.
          </Text>
        )}
      </Box>
    );
}

export default Tab;