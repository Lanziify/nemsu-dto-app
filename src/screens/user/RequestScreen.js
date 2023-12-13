import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useAuth} from '../../context/AuthContext';
import All from './tabs/All';
import Pending from './tabs/Pending';
import Accepted from './tabs/Accepted';
import Completed from './tabs/Completed';
import {colors} from '../../constant/colors';
import {textSize} from '../../constant/size';
import Greetings from '../../components/Greetings';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const RequestScreen = props => {
  const {user} = useAuth();
  const navigation = useNavigation();

  return (
    <>
      <Greetings user={user} />
      <Tab.Navigator
        screenOptions={{
          tabBarAndroidRipple: true,
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.inactiveIcon,
          tabBarIndicatorContainerStyle: {
            backgroundColor: colors.primary,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.accent,
          },
          tabBarLabelStyle: {
            fontSize: textSize.SM,
          },
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarPressOpacity: 1,
          tabBarPressColor: null,
        }}>
        <Tab.Screen
          name="All"
          children={() => (
            <All
              requests={props.requests}
              loading={props.loading}
              navigation={navigation}
              user={user}
            />
          )}
        />
        <Tab.Screen
          name="Pending"
          children={() => (
            <Pending
              requests={props.requests}
              loading={props.loading}
              navigation={navigation}
            />
          )}
        />
        <Tab.Screen
          name="Accepted"
          children={() => (
            <Accepted
              requests={props.requests}
              loading={props.loading}
              navigation={navigation}
            />
          )}
        />
        <Tab.Screen
          name="Completed"
          children={() => (
            <Completed
              requests={props.requests}
              loading={props.loading}
              navigation={navigation}
            />
          )}
        />
      </Tab.Navigator>
    </>
  );
};

export default React.memo(RequestScreen);
