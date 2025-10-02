import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Card,
  Text,
  Input,
  Field,
  Button,
  VStack,
  HStack,
  Alert,
} from "@chakra-ui/react";
import { LuLogIn } from "react-icons/lu";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://bookly-back.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        login(data.user, data.token);
        navigate("/profile");
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Error en el login. Verifica tus credenciales."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Card.Root>
        <Card.Header>
          <Card.Title textAlign="center" fontSize="2xl">
            Iniciar Sesión
          </Card.Title>
          <Text textAlign="center" color="fg.muted">
            Bienvenido de vuelta a Bookly
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
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Field.Root>

              <Button
                type="submit"
                width="100%"
                loading={loading}
                colorPalette="purple"
                leftIcon={<LuLogIn />}
              >
                Iniciar Sesión
              </Button>
            </VStack>
          </form>
        </Card.Body>

        <Card.Footer>
          <HStack justify="center" width="100%">
            <Text>¿No tienes cuenta?</Text>
            <Link
              to="/register"
              style={{
                color: "#bb9dee",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Regístrate aquí
            </Link>
          </HStack>
        </Card.Footer>
      </Card.Root>
    </LoginContainer>
  );
};

export default Login;
