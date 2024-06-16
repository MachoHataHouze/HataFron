import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Spinner,
  Avatar,
  HStack,
  useColorModeValue,
  Badge,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.700');
  const dividerColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:5217/api/Chat/chats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setChats(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching chats:', error);
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (userId) => {
    history.push(`/chat/${userId}`);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p="6">
      <Heading as="h1" size="xl" mb="6" textAlign="center">
        Your Chats
      </Heading>
      <VStack align="start" spacing={4} divider={<Divider borderColor={dividerColor} />}>
        {chats.length > 0 ? (
          chats.map((chat, index) => (
            <Box
              key={index}
              w="100%"
              p={4}
              bg={bgColor}
              rounded="md"
              shadow="md"
              _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
              onClick={() => handleChatClick(chat.userId)}
            >
              <HStack spacing={4}>
                <Avatar name={chat.otherUserName} />
                <Box flex="1">
                  <Text fontWeight="bold">{chat.otherUserName}</Text>
                  <Text fontSize="sm" color={textColor}>
                    {chat.lastMessage ? chat.lastMessage : 'No messages yet'}
                  </Text>
                </Box>
                {chat.unreadCount > 0 && (
                  <Badge colorScheme="red" fontSize="0.8em">
                    {chat.unreadCount}
                  </Badge>
                )}
              </HStack>
            </Box>
          ))
        ) : (
          <Text>No chats available</Text>
        )}
      </VStack>
    </Box>
  );
};

export default ChatList;

