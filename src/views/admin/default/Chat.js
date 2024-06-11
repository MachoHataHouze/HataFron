import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, FormControl, Input, Button } from '@chakra-ui/react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [connection, setConnection] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://localhost:5217/chathub", { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    connect.start()
      .then(() => {
        console.log('Connected!');
        connect.on('ReceiveMessage', (senderId, receiverId, message, timestamp) => {
          setMessages(prevMessages => [...prevMessages, { senderId, receiverId, message, timestamp }]);
        });
      })
      .catch(error => console.error('Connection failed: ', error));

    setConnection(connect);

    return () => {
      connect.stop();
    };
  }, [token]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!id) {
        console.error('No chat ID provided');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5217/api/Chat/messages/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [id, token]);

  const handleSendMessage = async () => {
    if (message.trim() === '' || !id) return;

    try {
      const response = await axios.post(
        'http://localhost:5217/api/Chat/send',
        {
          receiverId: id,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (connection) {
        await connection.invoke('SendMessage', response.data.senderId, response.data.receiverId, response.data.message, response.data.timestamp);
      }

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        {messages.map((msg, index) => (
          <Box key={index} p={4} bg={msg.senderId === id ? 'blue.100' : 'gray.100'} borderRadius="md">
            <Text>{msg.message}</Text>
            <Text fontSize="xs" color="gray.500" ml={2}>
              {moment(msg.timestamp).format('HH:mm:ss')}
            </Text>
          </Box>
        ))}
      </VStack>
      <FormControl mt={4}>
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button mt={2} colorScheme="blue" onClick={handleSendMessage}>
          Send
        </Button>
      </FormControl>
    </Box>
  );
};

export default Chat;

