import { Input, InputGroup, Box, IconButton, HStack } from "@chakra-ui/react";
import { LuSearch, LuX } from "react-icons/lu";

export const SearchInput = ({
  query,
  onQueryChange,
  placeholder
}) => {
  

  return (
    <HStack gap="2" width="100%">
      <InputGroup
        startElement={
          <Box color="muted.100">
            <LuSearch />
          </Box>
        }
        size={{ base: "sm", md: "md" }}
      >
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          rounded="full"
          border="solid 1px"
          borderColor="brand.900"
          _hover={{
            borderColor: "brand.100",
          }}
          _focus={{
            outline: "none !important",
            borderColor: "brand.100",
          }}
          maxHeight={{
            base: "35px",
            sm: "40px",
            md: "40px",
            lg: "40px",
          }}
          alignSelf="end"
          color="muted.200"
        />
      </InputGroup>
    </HStack>
  );
};

export default SearchInput;
