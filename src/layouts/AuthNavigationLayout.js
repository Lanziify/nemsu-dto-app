import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import HomeLayout from './HomeLayout';
import Create from '../screens/user/requests/Create';
import ReturnButton from '../components/ReturnButton';
import DetailsScreen from '../screens/user/DetailsScreen';

const Stack = createStackNavigator();

const AuthNavigationLayout = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeLayout} />
      <Stack.Screen
        name="Create"
        component={Create}
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => <ReturnButton />,
          headerShadowVisible: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animationTypeForReplace: 'pop',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => <ReturnButton />,
          headerShadowVisible: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animationTypeForReplace: 'pop',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigationLayout;
