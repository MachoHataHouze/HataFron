import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Badge,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FiHeart, FiBookOpen } from "react-icons/fi";
import Card from "components/card/Card.js";

export default function UserReports() {
  const [properties, setProperties] = useState([]);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const history = useHistory();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5135/api/Property');
        setProperties(response.data);
      } catch (error) {
        console.error("There was an error fetching the properties!", error);
      }
    };

    fetchProperties();
  }, []);

  const handleBookClick = (id) => {
    history.push(`/property/${id}`);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} px={{ base: "20px", md: "40px", xl: "60px" }}>
      <Heading mb={6} color={brandColor}>Available Properties</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="40px">
        {properties.map(property => (
          <Card key={property.id} maxW='sm' bg={boxBg} boxShadow="lg" borderRadius="md" overflow="hidden">
            <Image
              src={`data:image/jpeg;base64,${property.photo}`}
              alt={property.address}
              borderRadius='md'
              objectFit="cover"
              w="full"
              h="200px"
            />
            <Box p={6}>
              <Stack spacing={3}>
                <Heading size='md' color={brandColor}>{property.address}</Heading>
                <Text noOfLines={3} color="gray.600">{property.description}</Text>
                <Text fontWeight="bold" color="gray.700">Rooms: {property.rooms}</Text>
                <Text fontWeight="bold" color="gray.700">Price: ${property.price}</Text>
              </Stack>
              <Divider my={4} />
              <ButtonGroup spacing='4' justifyContent="space-between" alignItems="center">
                <Button leftIcon={<FiBookOpen />} variant='solid' colorScheme='blue' onClick={() => handleBookClick(property.id)}>
                  Book
                </Button>
                <Tooltip label="Add to wishlist" fontSize="md">
                  <IconButton
                    icon={<FiHeart />}
                    colorScheme='pink'
                    variant='outline'
                    aria-label='Add to wishlist'
                  />
                </Tooltip>
              </ButtonGroup>
            </Box>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

