import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContextProvider} from './src/context/AuthContext';
import NavigationLayout from './src/layouts/NavigationLayout';
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <NavigationLayout />
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
