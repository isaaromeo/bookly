import { Input, InputGroup, IconButton, HStack } from "@chakra-ui/react";
import { LuSearch, LuX } from "react-icons/lu";

export const SearchInput = ({
  query,
  onQueryChange,
  placeholder
}) => {
  

  return (
    <HStack gap="2" width="100%">
      <InputGroup startElement={<LuSearch />}>
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          rounded="full"
          border="solid 2px"
          borderColor="brand.900"
          _hover={{
            borderColor: "brand.100",
          }}
          _focus={{
            outline: "none !important",
            borderColor: "brand.100",
          }}
        />
      </InputGroup>
    </HStack>
  );
};

export default SearchInput;
