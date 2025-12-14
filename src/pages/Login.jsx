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
import { toaster} from "../components/ui/toaster.jsx"
import { useBooklyApi } from "@/hooks/useBooklyApi";

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

  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); 
  const { login, loading, error } = useBooklyApi.useLogin(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

    const result = await login(formData);
      
      if (result && result.user && result.token) {
        authLogin(result.user, result.token);
        
        toaster.create({
          title: "Welcome back!",
          description: "You have successfully logged in",
          type: "success",
        });
        
        navigate(`/profile/${result.user._id}`);
      }
    } catch (err) {
      
      toaster.create({
        title: "Login Failed",
        description: err.message || "Invalid credentials",
        type: "error",
      });
    
    } 
  };

  return (
    <LoginContainer>
      <Card.Root bg="brand.900" borderColor="brand.900">
        <Card.Header>
          <Card.Title textAlign="center" fontSize="2xl" color="brand.100">
            Log In
          </Card.Title>
          <Text textAlign="center" color="muted.100">
            Welcome Back to Bookly!
          </Text>
        </Card.Header>

        <Card.Body>

          <form onSubmit={handleSubmit}>
            <VStack gap="4">
              <Field.Root>
                <Field.Label color="muted.200">Email</Field.Label>
                <Input
                  name="email"
                  type="email"
                  placeholder=""
                  color="muted.100"
                  value={formData.email}
                  onChange={handleChange}
                  borderColor="brand.700"
                  _hover={{
                    boxShadow: "sm",
                    borderColor: "brand.300",
                  }}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label color="muted.200">Password</Field.Label>
                <Input
                  name="password"
                  type="password"
                  placeholder=""
                  color="muted.100"
                  value={formData.password}
                  onChange={handleChange}
                  borderColor="brand.700"
                  _hover={{
                    boxShadow: "sm",
                    borderColor: "brand.300",
                  }}
                  required
                />
              </Field.Root>

              <Button
                type="submit"
                width="100%"
                loading={loading}
                bg="brand.800"
                color="brand.100"
                _hover={{
                  boxShadow: "sm",
                  borderColor: "brand.300",
                }}
              >
                Log In
              </Button>
            </VStack>
          </form>
        </Card.Body>

        <Card.Footer>
          <HStack justify="center" width="100%">
            <Text color="primary.200">Don't have an account yet?</Text>
            <Link
              to="/register"
              style={{
                color: "#bb9dee",
                fontWeight: "bold",
                textDecoration: "none",
                
              }}
              
            >
              Register here
            </Link>
          </HStack>
        </Card.Footer>
      </Card.Root>
    </LoginContainer>
  );
};

export default Login;
