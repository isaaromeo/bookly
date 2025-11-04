import { useBooklyApi } from "../hooks/useBooklyApi";
import { useNavigate } from "react-router-dom";
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
    <Card.Root bg="brand.50" mb="12">
      <Card.Body>
        <VStack gap="4">
          <Heading size="lg" textAlign="center">
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
                <Heading size="2xl" color="brand.600">
                  {stat.number}
                </Heading>
                <Text color="fg.muted" fontSize="sm">
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