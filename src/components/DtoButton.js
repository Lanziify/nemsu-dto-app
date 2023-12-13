import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {layoutSize, textSize} from '../constant/size';
import {colors} from '../constant/colors';

const DtoButton = props => {
  const styles = StyleSheet.create({
    dtoButton: {
      borderRadius: layoutSize.MD,
      backgroundColor: props.primary ? colors.accent : colors.secondary,
      paddingHorizontal: layoutSize.MD,
      paddingVertical: layoutSize.MD,
    },
    text: {
      textAlign: 'center',
      color: colors.white,
      fontSize: textSize.MD,
      fontWeight: '500',
    },
  });

  return (
    <View>
      <TouchableHighlight
        style={[styles.dtoButton, props.styles]}
        onPress={props.onPress}
        activeOpacity={0.6}
        underlayColor={props.primary ? colors.accentUnderlay : colors.secondaryUnderlay}
        >
        <Text style={styles.text}>{props.text}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default DtoButton;
