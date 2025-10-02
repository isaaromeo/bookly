
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { Button, Avatar, Menu, VStack, HStack, Text } from "@chakra-ui/react";
import {
  LuUser,
  LuLogOut,
  LuBook,
  LuHouse,
  LuUserPlus,
  LuLogIn,
  LuSettings,
} from "react-icons/lu";
import { useAuth } from "../hooks/useAuth.jsx";

export const UserMenu = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user logged:", user);
  }, [user]);

  // 🔥 AÑADE ESTE EFECTO para ver cuándo se monta/desmonta
  useEffect(() => {
    console.log("🚀 UserMenu - COMPONENTE MONTADO");

    return () => {
      console.log("💥 UserMenu - COMPONENTE DESMONTADO");
    };
  }, []);

  useEffect(() => {
    console.log("🔍 UserMenu - Contexto recibido:", {
      user: user?.username || "null",
      loading,
    });
  }, [user, loading]);

  console.log("🔄 UserMenu - RENDERIZANDO, user:", user, "loading:", loading);

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
        <Button variant="ghost" size="md" padding="0.5" rounded="full">
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
        <Menu.Content minWidth="200px">
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

              <Menu.Separator />

              <Menu.Item
                value="profile"
                onClick={() => handleAction("profile")}
              >
                <LuUser />
                My Profile
              </Menu.Item>
              <Menu.Item value="books" onClick={() => handleAction("books")}>
                <LuBook />
                Explore Books
              </Menu.Item>
              <Menu.Item value="home" onClick={() => handleAction("home")}>
                <LuHouse />
                Home
              </Menu.Item>
              <Menu.Item value="settings">
                <LuSettings />
                Settings
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
