import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5217/api/Chat/messages/${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId, token]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <VStack spacing={4} align="stretch">
      {messages.map((message) => (
        <Box
          key={message.id}
          p={4}
          bg={message.senderId === 8 ? 'blue.100' : 'gray.100'} // Change senderId as per your requirement
          borderRadius="md"
        >
          <Text>{message.message}</Text>
          <Text fontSize="sm" color="gray.500">
            {new Date(message.timestamp).toLocaleString()}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};

export default ChatWindow;
