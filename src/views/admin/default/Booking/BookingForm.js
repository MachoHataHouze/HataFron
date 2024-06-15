import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

const BookingForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const toUTC = (date) => {
    const utcDate = new Date(date);
    return new Date(Date.UTC(utcDate.getFullYear(), utcDate.getMonth(), utcDate.getDate()));
  };

  const handleBooking = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Пожалуйста, войдите в систему, чтобы сделать бронирование.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5275/api/Booking',
        {
          propertyId: id,
          startDate: toUTC(startDate).toISOString(),
          endDate: toUTC(endDate).toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Booking response:', response);

      setSuccess('Бронирование успешно!');
      setIsLoading(false);

      // Перенаправление на страницу оплаты с ссылкой на договор
      const contractLink = `data:application/pdf;base64,${response.data.contract}`;
      history.push(`/payment?bookingId=${response.data.id}&totalPrice=${response.data.totalPrice}&contractLink=${encodeURIComponent(contractLink)}`);
    } catch (error) {
      console.error('Booking error:', error.response ? error.response.data : error.message);
      if (error.response) {
        setError(`Бронирование не удалось: ${error.response.data.message || error.response.statusText}`);
      } else {
        setError('Бронирование не удалось. Пожалуйста, попробуйте снова.');
      }
      setIsLoading(false);
    }
  };

  return (
    <Box
      pt={{ base: '100px', md: '80px', xl: '80px' }}
      px={{ base: '20px', md: '40px', xl: '60px' }}
    >
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="lg"
        p={{ base: '20px', md: '40px' }}
        boxShadow="lg"
      >
        <Heading size="lg" mb="6">
          Забронировать жилье
        </Heading>
        <VStack spacing="4">
          <FormControl isRequired>
            <FormLabel>Дата начала</FormLabel>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Дата окончания</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormControl>
          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">{success}</Text>}
          <Button
            colorScheme="blue"
            onClick={handleBooking}
            isLoading={isLoading}
          >
            Подтвердить бронирование
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default BookingForm;
