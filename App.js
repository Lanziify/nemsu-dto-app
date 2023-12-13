import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContextProvider} from './src/context/AuthContext';
import NavigationLayout from './src/layouts/NavigationLayout';

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
