import {Linking, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import DtoButton from '../../components/DtoButton';
import {useAuth} from '../../context/AuthContext';
import {colors} from '../../constant/colors';
import {layoutSize, textSize} from '../../constant/size';

const ProfileScreen = () => {
  const {logoutUser} = useAuth();

  const settingsItems = [
    {
      buttonText: 'Change Password',
      onPress: () => Linking.openURL('https://digital-transformation-office.web.app'),
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
