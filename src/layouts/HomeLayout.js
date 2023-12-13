import {TouchableHighlight} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAuth} from '../context/AuthContext';

import {collection, orderBy, query, where} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {firestore} from '../../firebase-config';
import Preloader from '../components/Preloader';
import DtoHeader from '../components/DtoHeader';

import Icon from 'react-native-vector-icons/Ionicons';

import RequestScreen from '../screens/user/RequestScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

import {colors} from '../constant/colors';
import {layoutSize} from '../constant/size';
import {useNavigation} from '@react-navigation/native';
import {appName} from '../constant/strings';

const Tab = createBottomTabNavigator();

const HomeLayout = () => {
  const {user, userLoading} = useAuth();
  const navigation = useNavigation();

  const dtoRequestsRef = collection(firestore, 'requests');
  const dtoNotificatonsRef = collection(firestore, 'notifications');

  const notificationsQuery = query(
    dtoNotificatonsRef,
    where('receiverId', '==', user ? user.uid : null),
    orderBy('createdAt', 'desc'),
  );

  const userRequestQuery = query(
    dtoRequestsRef,
    where('uid', '==', user ? user.uid : null),
    orderBy('createdAt', 'desc'),
  );
  const [requests, isFetchinRequests, fetchingReqError] =
    useCollectionData(userRequestQuery);

  const [notifications, isFetchingNotifications, fetchingNotifError] =
    useCollectionData(notificationsQuery);

  if (userLoading) {
    return <Preloader />;
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => {
          return {
            header: () => {
              let title = '';
              if (route.name === 'Request') {
                title = appName;
              }
              if (route.name === 'Profile') {
                title = 'Account Settings';
              }
              return <DtoHeader headerTitle={title} />;
            },
            headerShadowVisible: false,
            tabBarStyle: {
              // position: 'absolute',
              // borderTopStartRadius: layoutSize.MD,
              // borderTopEndRadius: layoutSize.MD,
              backgroundColor: colors.secondary,
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarIcon: ({focused}) => {
              let iconName;
              let color = focused ? colors.accent : colors.lightGray;
              if (route.name === 'Request') {
                iconName = focused ? 'documents' : 'documents-outline';
              }
              if (route.name === 'Notifications') {
                iconName = focused ? 'notifications' : 'notifications-outline';
              }
              if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }
              return <Icon name={iconName} size={28} color={color} />;
            },
            tabBarShowLabel: false,
          };
        }}>
        <Tab.Screen
          name="Request"
          children={() => (
            <RequestScreen requests={requests} loading={isFetchinRequests} />
          )}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      <TouchableHighlight
        style={{
          position: 'absolute',
          bottom: layoutSize.XXS,
          alignSelf: 'center',
          backgroundColor: colors.white,
          borderRadius: layoutSize.FULL,
          padding: layoutSize.XXS,
          borderWidth: 8,
          borderColor: colors.secondary,
          // elevation: 4,
        }}
        activeOpacity={0.6}
        underlayColor={colors.lightGray}
        onPress={() => navigation.navigate('Create')}>
        <Icon name="add" size={32} color={colors.accent} />
      </TouchableHighlight>
    </>
  );
};

export default React.memo(HomeLayout);
