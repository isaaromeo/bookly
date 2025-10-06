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
        />
      </InputGroup>
    </HStack>
  );
};

export default SearchInput;
