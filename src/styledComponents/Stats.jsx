import { useBooklyApi } from "../hooks/useBooklyApi";

import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  Heading,
  SimpleGrid,
  
} from "@chakra-ui/react";
import { LuUsers } from "react-icons/lu";

const Stats = () => {
  const { data: books } = useBooklyApi.useBooks();
//pasar stats como props para hacerlo más flexible
  const stats = [
    { number: books?.length || "500+", label: "Books in Library" },
    { number: "1.2K+", label: "Active Readers" },
    { number: "5.8K+", label: "Reviews Posted" },
    { number: "150+", label: "Reading Clubs" },
  ];

  return (
    <Card.Root bg="secondary.200" mb="12" boxShadow="md" opacity={0.7} borderRadius="15px">
      <Card.Body>
        <VStack gap="4">
          <Heading size="xl" color="brand.700"textAlign="center">
            Our Reading Community
          </Heading>
          <SimpleGrid
            columns={{ base: 2, md: 4 }}
            gap="6"
            width="100%"
            textAlign="center"
          >
            {stats.map((stat, index) => (
              <VStack key={index}>
                <Heading
                  size="3xl"
                  color="brand.300"
                  sx={{
                    fontWeight: "bold",
                    fontStyle: "normal",
                  }}
                >
                  {stat.number}
                </Heading>
                <Text color="primary.800" fontSize="sm">
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default Stats;