
import BookGrid from "../styledComponents/BookGrid";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Spinner,
  Alert,
  Container,
  Heading,
} from "@chakra-ui/react";

const CategorySection = ({
  title,
  books,
  loading,
  error,
  onBookSelect,
  categoryRef,
}) => {

  if (error) {
    return (
      <Alert.Root status="error" mb="6">
        <Alert.Indicator />
        <Alert.Title>Error loading: {error}</Alert.Title>
      </Alert.Root>
    );
  }

  const featuredBooks = books?.slice(0, 6) || [];

  return (
    <VStack gap="6" align="stretch" mb="12" ref={categoryRef}>
      <HStack justify="space-between" align="center">
        <Heading size="lg" id={title.toLowerCase().replace(/\s+/g, "-")}>
          {title}
        </Heading>
        <Button variant="ghost" size="sm">
          See All
        </Button>
      </HStack>

      {loading ? (
        <Box display="flex" justifyContent="center" padding="8">
          <Spinner size="lg" />
        </Box>
      ) : (
        <BookGrid
          books={featuredBooks}
          onBookSelect={onBookSelect}
          emptyMessage={`No ${title.toLowerCase()} books found`}
        />
      )}
    </VStack>
  );
};

export default CategorySection;