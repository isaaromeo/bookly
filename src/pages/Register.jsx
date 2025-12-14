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
import { toaster } from "../components/ui/toaster.jsx";
import { useBooklyApi } from "@/hooks/useBooklyApi";
import { useAuth } from "../hooks/useAuth";

const RegisterContainer = styled.div`
  max-width: 650px;
  width: 60%;
  // margin: 2rem auto;
  padding: 2rem;
  justify-self: center;

  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "768px"}) {
    margin: 0;
    padding: 1rem;
    width: 80%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "480px"}) {
    margin: 0;
    padding: 1rem;
    width: 100%;
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { register, loading, error } = useBooklyApi.useRegister();

  const { login: authLogin } = useAuth();
  const { login, loading: loginLoading, error: errorLogin } = useBooklyApi.useLogin();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };

  const validateForm = () => {
    if (formData.password.length < 8) {
      
      toaster.create({
        title: "Validation Error",
        description: "Password must be at least 8 characters long",
        type: "error",
      });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      
      toaster.create({
        title: "Validation Error",
        description: "Passwords don't match",
        type: "error",
      });
      return false;
    }
    if (!formData.email.includes("@")) {
     
      toaster.create({
        title: "Validation Error",
        description: "Please use a valid email address",
        type: "error",
      });
      return false;
    }
    if (formData.username.length < 3) {
      
      toaster.create({
        title: "Validation Error",
        description: "Username must be at least 3 characters long",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      //primero se hace el registro
      const result = await register(registerData);

      if (result && result.element) {
        //login automatico
        try{
          const loginResult = await login({
            email: formData.email,
            password: formData.password
          })

          console.log("login: ",loginResult);

          if (loginResult && loginResult.user && loginResult.token) {
            authLogin(loginResult.user, loginResult.token);

            toaster.create({
              title: "Welcome to Bookly!",
              description: "Your account has been created and you're logged in!",
              type: "success",
             });

            setTimeout(() => {
              navigate(`/profile/${loginResult.user._id}`);
            }, 1500);
          }
        
        } catch(err){
          toaster.create({
            title: "Login Failed",
            description: result?.message || "Error login into your account",
            type: "error",
          });
        }

    }} catch (err) {
      
      toaster.create({
        title: "Registration Failed",
        description: err.message || "Error creating account",
        type: "error",
      });
    }
     
  };

  return (
    <RegisterContainer>
      <Card.Root
        bg="brand.900"
        borderColor="brand.900"
        
      >
        <Card.Header>
          <Card.Title textAlign="center" fontSize="2xl" color="brand.100">
            Create Account
          </Card.Title>
          <Text textAlign="center" color="muted.100">
            Join the Bookly community!
          </Text>
        </Card.Header>

        <Card.Body>
          <form onSubmit={handleSubmit}>
            <VStack gap="4">
              <Field.Root>
                <Field.Label color="muted.200">Username</Field.Label>
                <Input
                  name="username"
                  placeholder="Your username"
                  color="muted.100"
                  value={formData.username}
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
                <Field.Label color="muted.200">Email</Field.Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
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
                  placeholder="Minimum 8 characters"
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

              <Field.Root>
                <Field.Label color="muted.200">Confirm Password</Field.Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  color="muted.100"
                  value={formData.confirmPassword}
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
                Create Account
              </Button>
            </VStack>
          </form>

          <Box mt="4" p="4" bg="brand.600" borderRadius="md">
            <Text fontSize="sm" fontWeight="semibold" color="brand.900" mb="2">
              Account requirements:
            </Text>
            <Text fontSize="sm" color="brand.900">• Username (min. 3 characters)</Text>
            <Text fontSize="sm" color="brand.900">• Valid email</Text>
            <Text fontSize="sm" color="brand.900">• Password (min. 8 characters)</Text>
          </Box>
        </Card.Body>

        <Card.Footer>
          <HStack justify="center" width="100%">
            <Text
              fontSize={{
                base: "sm",
                sm: "md",
                md: "md",
                lg: "xl",
              }}
              color="primary.200"
            >
              Already have an account?
            </Text>
            <Link
              to="/login"
              style={{
                color: "#bb9dee",
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Log In
            </Link>
          </HStack>
        </Card.Footer>
      </Card.Root>
    </RegisterContainer>
  );
};

export default Register;
