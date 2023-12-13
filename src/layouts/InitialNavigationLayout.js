import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardScreen from '../screens/onboard/OnboardScreen';
import LoginScreen from '../screens/public/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Preloader from '../components/Preloader';

const Stack = createStackNavigator();

const InitialNavigationLayout = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check if the user has completed onboarding in AsyncStorage or any other storage mechanism
    const checkOnboardingStatus = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem('onboardingStatus');
        if (onboardingStatus === 'completed') {
          setHasCompletedOnboarding(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (loading) return <Preloader />;

  return hasCompletedOnboarding ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Boarding" component={OnboardScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default InitialNavigationLayout;
