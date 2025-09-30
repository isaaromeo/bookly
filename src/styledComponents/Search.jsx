import { NavLink } from "react-router-dom";
import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { FaHome, FaUsers, FaDragon, FaBook, FaEllipsisV, FaEllipsisH } from "react-icons/fa";


export const Search = () => {
  return (
    <InputGroup flex="1" startElement={<LuSearch />}>
      <Input
        placeholder="Search books"
        style={{
          color: "white",
          borderColor: "purple",
        }}
      />
    </InputGroup>
  );
};

export default Search;
