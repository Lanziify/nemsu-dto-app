import {TouchableHighlight} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useAuth} from '../../context/AuthContext';
import Pending from './tabs/Pending';
import Accepted from './tabs/Accepted';
import Completed from './tabs/Completed';
import {colors} from '../../constant/colors';
import {layoutSize, textSize} from '../../constant/size';
import Icon from 'react-native-vector-icons/Ionicons';
import Greetings from '../../components/Greetings';
import {useNavigation} from '@react-navigation/native';
import All from './tabs/All';

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
      {/* <TouchableHighlight
        style={{
          position: 'absolute',
          bottom: layoutSize.MD,
          right: layoutSize.MD,
          backgroundColor: colors.accent,
          borderRadius: layoutSize.FULL,
          padding: layoutSize.XXS,
          elevation: 4,
        }}
        underlayColor={colors.accentUnderlay}
        onPress={() => navigation.navigate('Create')}>
        <Icon name="add" size={38} color={colors.primary} />
      </TouchableHighlight> */}
    </>
  );
};

export default React.memo(RequestScreen);