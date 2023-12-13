import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { colors } from '../constant/colors';

const Preloader = () => {
  const {width} = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary
    },
    lottieView: {
      width: width / 2,
      height: width / 2,
    },
  });
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/lottie/lottieloader.json')}
        autoPlay
        loop
        style={styles.lottieView}
      />
    </View>
  );
};

export default Preloader;
