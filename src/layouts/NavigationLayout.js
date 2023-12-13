import React from 'react';
import {useAuth} from '../context/AuthContext';
import Preloader from '../components/Preloader';
import AuthNavigationLayout from './AuthNavigationLayout';
import InitialNavigationLayout from './InitialNavigationLayout';
import SplashScreen from 'react-native-splash-screen';

const NavigationLayout = () => {
  const {user, userToken, userLoading} = useAuth();

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (userLoading) {
    return <Preloader />;
  }


  return user || userToken ? (
    <AuthNavigationLayout />
  ) : (
    <InitialNavigationLayout />
  );
};

export default NavigationLayout;
