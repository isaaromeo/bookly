
import { useNavigate } from "react-router-dom";
import { Button, Avatar, Menu, VStack, HStack, Text } from "@chakra-ui/react";
import {
  LuUser,
  LuLogOut,
  LuBook,
  LuUserPlus,
  LuLogIn,
  LuSettings,
} from "react-icons/lu";
import { useAuth } from "../hooks/useAuth.jsx";

export const UserMenu = () => {
const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAction = (action) => {
    switch (action) {
      case "profile":
        navigate("/profile");
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
      case "logout":
        logout();
        window.location.href = "/";
        break;
      default:
        break;
    }
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="ghost" padding="2" borderRadius="full">
          <Avatar.Root size="sm" colorPalette="purple">
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
        <Menu.Content minWidth="200px" zIndex="dropdown">
          {user ? (
            // Usuario autenticado
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

              <Menu.Separator />

              <Menu.Item value="profile" onClick={() => navigate("/profile")}>
                <LuUser />
                My Profile
              </Menu.Item>
              <Menu.Item value="books" onClick={() => navigate("/books")}>
                <LuBook />
                Explore Books
              </Menu.Item>
              <Menu.Item value="home" onClick={() => navigate("/")}>
                <LuSettings />
                Home
              </Menu.Item>
              <Menu.Item value="settings">
                <LuSettings />
                Settings
              </Menu.Item>

              <Menu.Separator />

              {/* <Menu.Item
                value="logout"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  setUser(null);
                  window.location.href = "/";
                }}
                colorPalette="red"
              >
                <LuLogOut />
                Cerrar Sesión
              </Menu.Item> */}

              <Menu.Item
                value="logout"
                onClick={() => handleAction("logout")}
                colorPalette="red"
              >
                <LuLogOut />
                Cerrar Sesión
              </Menu.Item>
            </>
          ) : (
            // Usuario no autenticado
            <>
              <Menu.ItemGroup id="welcome">
                <Menu.Item value="welcome" closeOnSelect={false}>
                  <Text fontWeight="semibold" fontSize="sm">
                    Bienvenido a Bookly
                  </Text>
                </Menu.Item>
              </Menu.ItemGroup>

              <Menu.Separator />

              <Menu.Item value="login" onClick={() => navigate("/login")}>
                <LuLogIn />
                Iniciar Sesión
              </Menu.Item>
              <Menu.Item value="register" onClick={() => navigate("/register")}>
                <LuUserPlus />
                Registrarse
              </Menu.Item>

              <Menu.Separator />

              <Menu.Item value="books" onClick={() => navigate("/books")}>
                <LuBook />
                Explorar Libros
              </Menu.Item>
            </>
          )}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default UserMenu;
