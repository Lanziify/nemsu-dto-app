import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import HomeLayout from './HomeLayout';
import Create from '../screens/user/requests/Create';
import ReturnButton from '../components/ReturnButton';
import DetailsScreen from '../screens/user/DetailsScreen';
import PasswordChange from '../screens/user/settings/PasswordChange';
import Toast from 'react-native-toast-message';
import React from 'react';
import Preloader from '../components/Preloader';
import {StatusBar} from 'react-native';
import { colors } from '../constant/colors';

const Stack = createStackNavigator();

const AuthNavigationLayout = () => {
  const [loading, setLoading] = React.useState(false);

  if (loading) return <Preloader />;

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeLayout} />
        <Stack.Screen
          name="Create"
          children={() => <Create loading={loading} setLoading={setLoading} />}
          options={{
            headerShown: true,
            headerTitle: '',
            headerLeft: () => <ReturnButton showIcon />,
            headerShadowVisible: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            animationTypeForReplace: 'pop',
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerLeft: () => <ReturnButton showIcon />,
            headerShadowVisible: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            animationTypeForReplace: 'pop',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="PasswordChange"
          component={PasswordChange}
          options={{
            headerShown: true,
            headerTitle: '',
            headerLeft: () => <ReturnButton showIcon />,
            headerShadowVisible: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            animationTypeForReplace: 'pop',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
      <Toast autoHide />
    </>
  );
};

export default AuthNavigationLayout;
