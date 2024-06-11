import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
  Flex
} from '@chakra-ui/react';

const PaymentForm = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get('bookingId');
  const totalPrice = queryParams.get('totalPrice');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const bg = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    if (!bookingId || !totalPrice) {
      setError('Invalid booking information.');
    }
  }, [bookingId, totalPrice]);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Фейковая обработка платежа
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess('Payment successful!');
      setIsLoading(false);

      // Перенаправление на страницу завершения после успешной оплаты
      history.push('/payment-success');
    } catch (error) {
      console.error('Payment error:', error.message);
      setError('Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text>{error}</Text>
      </Flex>
    );
  }

  return (
    <Box
      pt={{ base: '100px', md: '80px', xl: '80px' }}
      px={{ base: '20px', md: '40px', xl: '60px' }}
    >
      <Box
        bg={bg}
        borderRadius="lg"
        p={{ base: '20px', md: '40px' }}
        boxShadow="lg"
      >
        <Heading size="lg" mb="6">
          Payment
        </Heading>
        <VStack spacing="4">
          <FormControl isRequired>
            <FormLabel>Card Number</FormLabel>
            <Input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Expiry Date</FormLabel>
            <Input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>CVC</FormLabel>
            <Input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </FormControl>
          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">{success}</Text>}
          <Button
            colorScheme="blue"
            onClick={handlePayment}
            isLoading={isLoading}
          >
            Complete Payment
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default PaymentForm;
