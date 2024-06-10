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
} from "@chakra-ui/react";
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Импорт useHistory
import Card from "components/card/Card.js";

export default function UserReports() {
  const [properties, setProperties] = useState([]);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const history = useHistory(); // Используем useHistory для навигации

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
    history.push(`/property/${id}`); // Переход на страницу с деталями
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing="20px">
        {properties.map(property => (
          <Card key={property.id} maxW='sm'>
            <Image
              src={`data:image/jpeg;base64,${property.photo}`} // Использование base64-кодированной строки
              alt={property.address}
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{property.address}</Heading>
              <Text>{property.description}</Text>
              <Text>Rooms: {property.rooms}</Text>
              <Text>Price: ${property.price}</Text>
            </Stack>
            <Divider />
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue' onClick={() => handleBookClick(property.id)}>
                Book
              </Button>
              <Button variant='ghost' colorScheme='blue'>
                Add to wishlist
              </Button>
            </ButtonGroup>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
