import { NavLink } from "react-router-dom";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { FaHome, FaUsers, FaDragon, FaBook, FaEllipsisV, FaEllipsisH } from "react-icons/fa";


export const Search = () => {
  return (
    <InputGroup flex="1" size="lg">
      <InputLeftElement>
        <LuSearch />
      </InputLeftElement>
      <Input
        placeholder="Search bookrrrs"
        color="lime.500"
        borderColor="lime.200"
        _focus={{
          borderColor: "lime.500",
          boxShadow: "0 0 0 1px lime.500",
        }}
      />
    </InputGroup>
  );
};

export default Search;
