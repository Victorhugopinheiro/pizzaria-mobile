
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import SignIn from './src/pages/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { UserAuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <NavigationContainer>

      <UserAuthProvider>
        <StatusBar backgroundColor={"#1d1d2e"} barStyle="light-content" translucent={false} />
        <Routes />
      </UserAuthProvider>

    </NavigationContainer>
  );
}

