import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Avatar,
  Card,
  VStack,
  HStack,
  Text,
  Portal,
  Box,
  Menu,
  Separator,
} from "@chakra-ui/react";
import {
  LuUser,
  LuLogOut,
  LuBook,
  LuUserPlus,
  LuLogIn,
  LuSettings,
} from "react-icons/lu";
import { useClickOutside } from "../hooks/useClickOutside";

export const UserMenu = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  // Cargar usuario al montar el componente
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Hook para cerrar al hacer clic fuera
  useClickOutside(menuRef, () => setIsOpen(false));

  const handleLogin = () => {
    setIsOpen(false);
    navigate("/login");
  };

  const handleRegister = () => {
    setIsOpen(false);
    navigate("/register");
  };

  const handleProfile = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    window.location.href = "/";
  };

  const handleBooks = () => {
    setIsOpen(false);
    navigate("/books");
  };

  return (
    <Box position="relative" ref={menuRef}>
      {/* Botón de usuario */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        padding="2"
        borderRadius="full"
      >
        <Avatar.Root size="sm" colorPalette="purple">
          {user ? (
            <>
              <Avatar.Fallback name={user.username} />
              {user.profilePic && <Avatar.Image src={user.profilePic} />}
            </>
          ) : (
            <Avatar.Fallback>
              <LuUser />
            </Avatar.Fallback>
          )}
        </Avatar.Root>
      </Button>

      {/* Menú desplegable */}
      {isOpen && (
        <Portal>
          <Card.Root
            position="absolute"
            top="100%"
            right="0"
            marginTop="2"
            zIndex="dropdown"
            minWidth="240px"
          >
            <Card.Body padding="3">
              {user ? (
                // Usuario autenticado
                <VStack gap="2" align="stretch">
                  {/* Información del usuario */}
                  <HStack gap="3" padding="2">
                    <Avatar.Root size="sm" colorPalette="purple">
                      <Avatar.Fallback name={user.username} />
                      {user.profilePic && (
                        <Avatar.Image src={user.profilePic} />
                      )}
                    </Avatar.Root>
                    <VStack align="start" gap="0">
                      <Text fontWeight="semibold" fontSize="sm">
                        {user.username}
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        {user.email}
                      </Text>
                    </VStack>
                  </HStack>

                  <Separator />

                  {/* Opciones del menú */}
                  <Menu.Group>
                    <Menu.Item value="profile" onClick={handleProfile}>
                      <LuUser />
                      Mi Perfil
                    </Menu.Item>
                    <Menu.Item value="books" onClick={handleBooks}>
                      <LuBook />
                      Explorar Libros
                    </Menu.Item>
                    <Menu.Item value="settings">
                      <LuSettings />
                      Configuración
                    </Menu.Item>
                  </Menu.Group>

                  <Separator />

                  <Menu.Item
                    value="logout"
                    onClick={handleLogout}
                    colorPalette="red"
                  >
                    <LuLogOut />
                    Cerrar Sesión
                  </Menu.Item>
                </VStack>
              ) : (
                // Usuario no autenticado
                <VStack gap="3" align="stretch">
                  <Text fontWeight="semibold" fontSize="sm" paddingX="2">
                    Bienvenido a Bookly
                  </Text>

                  <Button
                    colorPalette="purple"
                    onClick={handleLogin}
                    leftIcon={<LuLogIn />}
                    size="sm"
                  >
                    Iniciar Sesión
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleRegister}
                    leftIcon={<LuUserPlus />}
                    size="sm"
                  >
                    Registrarse
                  </Button>

                  <Separator />

                  <Button
                    variant="ghost"
                    onClick={handleBooks}
                    leftIcon={<LuBook />}
                    size="sm"
                    justifyContent="start"
                  >
                    Explorar Libros
                  </Button>
                </VStack>
              )}
            </Card.Body>
          </Card.Root>
        </Portal>
      )}
    </Box>
  );
};

export default UserMenu;
