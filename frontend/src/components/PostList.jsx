import { useEffect, useState } from 'react';
import { Box, Text, Button, VStack, Spinner } from '@chakra-ui/react';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(searchQuery ? `/api/posts/search?q=${searchQuery}` : '/api/posts');
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, [searchQuery]);

  const handleComment = async (postId, message) => {
    const user = getAuth().currentUser;
    if (user && message.trim()) {
      const idToken = await user.getIdToken();
      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ message, user: user.displayName }),
      });

      if (res.ok) {
        const updatedPost = await res.json();
        setPosts(posts.map(post => (post._id === updatedPost._id ? updatedPost : post)));
      }
    }
  };

  return (
    <Box>
      <input 
        type="text" 
        placeholder="Search posts or comments" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <Text>No posts found. Be the first to create one!</Text>
      ) : (
        <VStack spacing={4}>
          {posts.map((post) => (
            <Box key={post._id} p={4} shadow="md" borderWidth="1px" borderRadius="xl">
              <Text fontSize="xl">{post.user}</Text>
              <Text>{post.message}</Text>
              <Box mt={4}>
                <Text fontWeight="bold">Comments:</Text>
                {post.comments.length === 0 ? (
                  <Text>No comments yet</Text>
                ) : (
                  post.comments.map((comment, index) => (
                    <Box key={index} mt={2}>
                      <Text fontWeight="bold">{comment.user}:</Text>
                      <Text>{comment.message}</Text>
                    </Box>
                  ))
                )}
              </Box>
              <Box mt={2}>
                <input 
                  type="text" 
                  placeholder="Add a comment" 
                  onBlur={(e) => handleComment(post._id, e.target.value)} 
                />
              </Box>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
