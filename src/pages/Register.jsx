import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Text,
  Input,
  Field,
  Button,
  VStack,
  HStack,
  Alert,
  Box,
} from "@chakra-ui/react";
import { LuUserPlus } from "react-icons/lu";
import styled from "styled-components";

const RegisterContainer = styled.div`
  max-width: 450px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const validateForm = () => {
    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Por favor ingresa un email válido");
      return false;
    }
    if (formData.username.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { confirmPassword, ...registerData } = formData;

      const response = await fetch(
        "https://bookly-back.onrender.com/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("¡Registro exitoso! Por favor inicia sesión.");
        navigate("/login");
      } else {
        setError(data.message || "Error en el registro. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <Card.Root>
        <Card.Header>
          <Card.Title textAlign="center" fontSize="2xl">
            Crear Cuenta
          </Card.Title>
          <Text textAlign="center" color="fg.muted">
            Únete a la comunidad de Bookly
          </Text>
        </Card.Header>

        <Card.Body>
          {error && (
            <Alert.Root status="error" mb="4">
              <Alert.Indicator />
              <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
          )}

          <form onSubmit={handleSubmit}>
            <VStack gap="4">
              <Field.Root>
                <Field.Label>Nombre de Usuario</Field.Label>
                <Input
                  name="username"
                  placeholder="Tu nombre de usuario"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Contraseña</Field.Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Confirmar Contraseña</Field.Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Field.Root>

              <Button
                type="submit"
                width="100%"
                loading={loading}
                colorPalette="purple"
                leftIcon={<LuUserPlus />}
              >
                Crear Cuenta
              </Button>
            </VStack>
          </form>

          <Box mt="4" p="4" bg="bg.subtle" borderRadius="md">
            <Text fontSize="sm" fontWeight="semibold" mb="2">
              Requisitos de la cuenta:
            </Text>
            <Text fontSize="sm">• Nombre de usuario (mín. 3 caracteres)</Text>
            <Text fontSize="sm">• Email válido</Text>
            <Text fontSize="sm">• Contraseña (mín. 8 caracteres)</Text>
          </Box>
        </Card.Body>

        <Card.Footer>
          <HStack justify="center" width="100%">
            <Text>¿Ya tienes cuenta?</Text>
            <Link
              to="/login"
              style={{
                color: "#bb9dee",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Inicia Sesión
            </Link>
          </HStack>
        </Card.Footer>
      </Card.Root>
    </RegisterContainer>
  );
};

export default Register;
