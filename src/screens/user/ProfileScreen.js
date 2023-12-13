import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {useAuth} from '../../context/AuthContext';
import {colors} from '../../constant/colors';
import {layoutSize, textSize} from '../../constant/size';
import DtoLogo from '../../components/DtoLogo';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const {user, logoutUser} = useAuth();
  const navigation = useNavigation();

  const settingsItems = [
    {
      buttonText: 'Change Password',
      onPress: () => navigation.navigate('PasswordChange'),
    },
    {
      buttonText: 'Logout',
      onPress: logoutUser,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    profileContainer: {
      padding: layoutSize.MD,
      alignItems: 'center',
      gap: layoutSize.MD,
      marginBottom: layoutSize.MD,
    },
    profileLogoContainer: {
      gap: layoutSize.XS,
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: layoutSize.XL,
      backgroundColor: colors.white,
      borderRadius: layoutSize.FULL,
      borderWidth: 4,
      borderColor: colors.accent,
      elevation: 4,
    },
    heading: {
      fontWeight: '900',
      fontSize: textSize.LG,
      color: colors.black,
    },
    button: {
      paddingHorizontal: layoutSize.MD,
      paddingVertical: layoutSize.SM,
    },
    buttonText: {
      fontSize: textSize.MD,
      color: colors.black,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileLogoContainer}>
          <DtoLogo width={32} height={32} fill={colors.accent} />
        </View>
        <Text style={styles.heading}>{user.displayName}</Text>
      </View>
      <View>
        {settingsItems.map((item, index) => (
          <TouchableHighlight
            key={index}
            onPress={item.onPress}
            style={styles.button}
            activeOpacity={0.6}
            underlayColor={colors.lightGrayUnderlay}>
            <View>
              <Text style={styles.buttonText}>{item.buttonText}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
};

export default ProfileScreen;
