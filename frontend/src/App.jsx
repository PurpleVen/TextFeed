import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth, provider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { ChakraProvider, Box, Input, Button, Heading, Text, VStack, HStack, Spacer, Textarea, Spinner } from '@chakra-ui/react';


const App = () => {
  const [user, setUser] = useState(null);  //firebase
  const [token, setToken] = useState(''); //auth token
  const [message, setMessage] = useState(''); //new post
  const [posts, setPosts] = useState([]); //list f all post
  const [searchQuery, setSearchQuery] = useState(''); //search
  const [comments, setComments] = useState({}); //comment fr post

  useEffect(() => {
    if (user) fetchPosts(); 
  }, [user]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    const idToken = await result.user.getIdToken();
    setToken(idToken);
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    setToken('');
  };

  const [searching, setSearching] = useState(false);


  const handlePost = async () => {
    if (!message.trim()) return;
    try {
      await axios.post(
        'http://localhost:5000/api/posts/posts',
        { user: user.displayName, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('');
      fetchPosts();
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  const handleComment = async (postId) => {
    if (!comments[postId]?.trim()) return;
    try {
      await axios.post(
        `http://localhost:5000/api/posts/posts/${postId}/comment`,
        { user: user.displayName, message: comments[postId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => ({ ...prev, [postId]: '' }));
      fetchPosts();
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  const handleSearch = async () => {
    setSearching(true);
    try {

      await new Promise((res) => setTimeout(res, 500)); // 1-second delay

      const res = await axios.get(
        `http://localhost:5000/api/posts/posts/search?q=${searchQuery}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(res.data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setSearching(false);
    }
  };

  if (!user) {
    return (
      <ChakraProvider>
        <Box p={8} textAlign="center">
          <Heading mb={6}>Welcome to Posts Feed</Heading>
          <Button onClick={handleLogin} colorScheme="teal">Login with Google</Button>
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Box p={6} maxW="800px" mx="auto">
        <HStack justify="space-between" mb={4}>
          <Box></Box>
          <Button onClick={handleLogout} colorScheme="red">Logout</Button>
        </HStack>

        <Heading mb={4} textAlign="center">Text Feed</Heading>

        <Box mb={6}>
          <Heading size="md" mb={2}>Write what's on your mind</Heading>
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What's on your mind?" mb={2} />
          <Button onClick={handlePost} colorScheme="blue">Post</Button>
        </Box>

        <Box mb={6}>
        <Heading size="md" mb={2}>Search what you missed!</Heading>
          <Input
            placeholder="Search posts or comments"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            mb={2}
          />
          <Button onClick={handleSearch} colorScheme="purple">Search</Button>
        </Box>

        <Heading size="md" mb={4}>Recent Thoughts</Heading>
    
        <VStack spacing={6} align="stretch">
  {searching ? (
    <HStack>
    <Text fontStyle="italic" color="blue.500">Searching...</Text>
    <Spinner size="sm" color="blue.500" />
  </HStack>
  
  ) : posts.length === 0 ? (
    <Text fontStyle="italic" color="gray.500">
      {searchQuery ? `No results found for "${searchQuery}".` : "No posts yet."}
    </Text>
  ) : (
    posts.map((post) => (
      <Box key={post._id} p={4} borderWidth={1} borderRadius="md">
        <Text fontWeight="bold">{post.user}</Text>
        <Text>{post.message}</Text>
        <Box mt={3}>
          <Input
            value={comments[post._id] || ''}
            onChange={(e) =>
              setComments((prev) => ({ ...prev, [post._id]: e.target.value }))
            }
            placeholder="Add a comment..."
            size="sm"
            mb={2}
          />
          <Button size="sm" onClick={() => handleComment(post._id)} colorScheme="green">
            Comment
          </Button>
        </Box>
        <Box mt={2} pl={4}>
          {post.comments.map((comment, index) => (
            <Text key={index} fontSize="sm">
              <strong>{comment.user}</strong>: {comment.message}
            </Text>
          ))}
        </Box>
      </Box>
    ))
  )}
</VStack>


      </Box>
    </ChakraProvider>
  );
};

export default App;
