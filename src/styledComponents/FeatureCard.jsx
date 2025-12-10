import {
  Box,
  Card,
  Text,

} from "@chakra-ui/react";

const FeatureCard = ({ icon, title, description }) => (
  <Card.Root variant="outline" height="100%" bg="brand.900" borderColor="brand.900">
    <Card.Body textAlign="center">
      <Box fontSize="2xl" mb="3" color="brand.500">
        {icon}
      </Box>
      <Text fontWeight="semibold" mb="2" color="secondary.100">
        {title}
      </Text>
      <Text fontSize="sm" color="muted.100">
        {description}
      </Text>
    </Card.Body>
  </Card.Root>
);

export default FeatureCard;
