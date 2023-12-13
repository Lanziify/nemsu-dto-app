import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {colors} from '../constant/colors';
import {layoutSize, textSize} from '../constant/size';
import {useNavigation} from '@react-navigation/native';

const ReturnButton = props => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    returnButton: {
      marginLeft: layoutSize.MD,
      flexDirection: 'row',
      alignItems: 'center',
      gap: layoutSize.XXS,
    },
    text: {
      fontSize: textSize.MD,
      fontWeight: '500',
      color: colors.black,
    },
  });
  return (
    <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
      <Icon name="chevron-back" size={24} color={colors.black} />
      <Text style={styles.text}>{props.returnText || 'Return'}</Text>
    </TouchableOpacity>
  );
};

export default ReturnButton;
