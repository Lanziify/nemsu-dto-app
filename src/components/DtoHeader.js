import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {colors} from '../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {layoutSize, textSize} from '../constant/size';
import DtoLogo from './DtoLogo';

const DtoHeader = props => {
  const {width, height} = useWindowDimensions();

  const styles = StyleSheet.create({
    headerContainer: {
      width: width,
      backgroundColor: colors.primary,
      padding: layoutSize.MD,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      textAlign: 'center',
      fontSize: textSize.MD,
      fontWeight: 'bold',
      color: colors.accent,
    },
  });
  return (
    <View style={styles.headerContainer}>
      <DtoLogo width={24} height={24} fill={colors.accent} />
      <Text style={styles.headerTitle}>{props.headerTitle}</Text>
      <View>
        <Icon name="search" size={24} color={colors.black}/>
      </View>
    </View>
  );
};

export default DtoHeader;
