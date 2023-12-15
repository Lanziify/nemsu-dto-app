import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardScreen from '../screens/onboard/OnboardScreen';
import LoginScreen from '../screens/public/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Preloader from '../components/Preloader';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

const InitialNavigationLayout = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </>
  ) : (
    <>
      <StatusBar translucent  backgroundColor="transparent" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Boarding" component={OnboardScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </>
  );
};

export default React.memo(InitialNavigationLayout);
