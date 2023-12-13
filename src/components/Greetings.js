import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {layoutSize, textSize} from '../constant/size';
import {colors} from '../constant/colors';
import DtoLogo from './DtoLogo';

const Greetings = props => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: layoutSize.MD,
      backgroundColor: colors.primary,
    },
    title: {
      fontSize: textSize.MSV,
      lineHeight: textSize.MSV * 1.6,
      fontWeight: '900',
      color: colors.black,
    },
    text: {
      fontSize: textSize.XL,
      fontWeight: 'bold',
      lineHeight: textSize.XL * 1.6,
      color: colors.gray,
    },
    logoContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      transform: [
        {rotate: '-20deg'},
        {translateX: -10},
        {translateY: 30},
        {scaleX: 1.5},
        {scaleY: 1.5},
      ],
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <DtoLogo width={100} height={100} fill={colors.accent} opacity={0.2}/>
      </View>
      <Text style={styles.text}>{getGreeting()},</Text>
      <Text style={styles.title}>{props.user?.displayName.split(' ')[0]}!</Text>
    </View>
  );
};

export default Greetings;
