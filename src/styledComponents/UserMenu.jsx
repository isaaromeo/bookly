
import { useNavigate} from "react-router-dom";
import { Button, Avatar, Menu, VStack, HStack, Text } from "@chakra-ui/react";
import {
  LuUser,
  LuLogOut,
  LuBook,
  LuHouse,
  LuUserPlus,
  LuLogIn,
  LuSettings,
  LuSun,
  LuMoon
} from "react-icons/lu";
import { useAuth } from "../hooks/useAuth.jsx";
import { useColorMode } from "../components/ui/color-mode";
import styled from "styled-components";

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();


  const handleAction = (action) => {
    switch (action) {
      case "profile":
        navigate(`/profile/${user._id}`);
        break;
      case "books":
        navigate("/books");
        break;
      case "login":
        navigate("/login");
        break;
      case "register":
        navigate("/register");
        break;
      case "home":
        navigate("/");
        break;
      case "logout":
        logout();
        navigate("/");
        break;
      default:
        break;
    }
  };

  return (
    <Menu.Root positioning={{ placement: "bottom-start" }}>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          
          _hover={{
            boxShadow: "sm",
            borderColor: "brand.300",
          }}
          _focus={{
            outline: "none !important",
          }}
          padding="0.5"
          rounded="full"
          size={{
            base: "sm",
            sm: "sm",
            md: "md",
            lg: "md",
          }}
        >
          <Avatar.Root
            size={{
              base: "xs",
              sm: "xs",
              md: "sm",
              lg: "sm",
            }}
          >
            {user ? (
              <>
                <Avatar.Fallback name={user.username} />
                {user.profilePic && (
                  <Avatar.Image
                    src={user.profilePic}
                    alt={`${user.username} profile picture`}
                  />
                )}
              </>
            ) : (
              <Avatar.Fallback>
                <LuUser />
              </Avatar.Fallback>
            )}
          </Avatar.Root>
        </Button>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content minWidth="200px" bg="brand.900">
          {user ? (
            <>
              <Menu.ItemGroup id="user-info">
                <Menu.Item value="user-header" closeOnSelect={false}>
                  <HStack gap="3" width="100%">
                    <Avatar.Root size="sm" colorPalette="purple">
                      <Avatar.Fallback name={user.username} />
                      {user.profilePic && (
                        <Avatar.Image
                          src={user.profilePic}
                          alt={`${user.username} profile picture`}
                        />
                      )}
                    </Avatar.Root>
                    <VStack align="start" gap="0" flex="1">
                      <Text fontWeight="semibold" fontSize="sm">
                        {user.username}
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        {user.email}
                      </Text>
                    </VStack>
                  </HStack>
                </Menu.Item>
              </Menu.ItemGroup>

              <Menu.Separator bg="brand.200" />

              <Menu.Item
                value="profile"
                onClick={() => handleAction("profile")}
                color="brand.100"
                cursor="pointer"
              >
                <LuUser />
                My Profile
              </Menu.Item>
              <Menu.Item
                value="explore"
                color="brand.100"
                cursor="pointer"
                onClick={() => handleAction("books")}
              >
                <LuBook />
                Explore Books
              </Menu.Item>
              <Menu.Item
                value="home"
                color="brand.100"
                cursor="pointer"
                onClick={() => handleAction("home")}
              >
                <LuHouse />
                Home
              </Menu.Item>

              <Menu.Separator />

              <Menu.Item
                value="logout"
                onClick={() => handleAction("logout")}
                color="fg.error"
                _hover={{ bg: "bg.error", color: "fg.error" }}
              >
                <LuLogOut />
                Logout
              </Menu.Item>
              <Menu.Separator />
            </>
          ) : (
           
            <>
              <Menu.ItemGroup id="welcome">
                <Menu.Item
                  bg="primary.900"
                  value="welcome"
                  closeOnSelect={false}
                >
                  <Text fontWeight="semibold" fontSize="sm" color="brand.200">
                    Welcome to Bookly!
                  </Text>
                </Menu.Item>
              </Menu.ItemGroup>

              <Menu.Separator colorPalette="gray" />

              <Menu.Item
                value="login"
                color="brand.100"
                cursor="pointer"
                onClick={() => navigate("/login")}
              >
                <LuLogIn />
                Log in
              </Menu.Item>
              <Menu.Item
                color="brand.100"
                value="register"
                cursor="pointer"
                onClick={() => navigate("/register")}
              >
                <LuUserPlus />
                Register
              </Menu.Item>

              <Menu.Separator />

              <Menu.Item
                color="brand.100"
                value="books"
                cursor="pointer"
                onClick={() => navigate("/books")}
              >
                <LuBook />
                Explore books
              </Menu.Item>
            </>
          )}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default UserMenu;
