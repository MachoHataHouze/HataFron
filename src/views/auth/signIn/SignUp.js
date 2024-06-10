import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";
import { NavLink } from "react-router-dom";

function SignUp() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const history = useHistory();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5081/api/Auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      setSuccess("User registered successfully.");
      setError(null);

      // Перенаправление на страницу входа после успешной регистрации
      history.push("/auth/sign-in");
    } catch (error) {
      setError("Registration failed. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign Up
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your details to create an account!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              First Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="First Name"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Last Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Last Name"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              placeholder="Min. 8 characters"
              mb="24px"
              size="lg"
              type="password"
              variant="auth"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Text color="red.500" mb="24px">
                {error}
              </Text>
            )}
            {success && (
              <Text color="green.500" mb="24px">
                {success}
              </Text>
            )}
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={handleRegister}
            >
              Sign Up
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Already have an account?
              <NavLink to="/auth/sign-in">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Sign In
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
