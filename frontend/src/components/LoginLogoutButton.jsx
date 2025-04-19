import { Button } from '@chakra-ui/react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase'; 

export default function LoginLogoutButton({ user, setUser }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);  // set the logged-in user

      // Retrieve the idToken after the login
      const idToken = await result.user.getIdToken();
      console.log('Firebase ID Token:', idToken);

      // Optionally, store the token in localStorage for later use
      localStorage.setItem('authToken', idToken);

    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);  // clear user data

      // Optionally, clear the token from localStorage
      localStorage.removeItem('authToken');

    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <Button onClick={user ? handleLogout : handleLogin}>
      {user ? 'Logout' : 'Login with Google'}
    </Button>
  );
}
