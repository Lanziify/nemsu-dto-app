import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {layoutSize, textSize} from '../constant/size';
import {colors} from '../constant/colors';

const DtoInput = props => {
  const [hidePassword, sethidePassword] = React.useState(true);
  const styles = StyleSheet.create({
    dtoTextInput: {
      paddingLeft: props.iconStart ? layoutSize.XXL : layoutSize.SM,
      paddingRight: props.iconEnd ? layoutSize.XXL : layoutSize.SM,
      paddingVertical: layoutSize.SM,
      borderRadius: layoutSize.MD,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.inputBackground,
      fontSize: textSize.MD,
      textAlignVertical: props.multiline ? "top" : "center",
      // borderColor:
      //   props.error && props.error != undefined && props.error != 'VALID'
      //     ? colors.danger
      //     : props.error === 'VALID'
      //     ? colors.success
      //     : colors.border,
    },
    iconStart: {
      marginLeft: layoutSize.MD,
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconEnd: {
      marginRight: layoutSize.MD,
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={props.inputContainerStyle}>
      {props.label && (
        <Text
          style={{
            marginBottom: layoutSize.XXS,
            fontWeight: 'bold',
          }}>
          {props.label}
        </Text>
      )}
      <View>
        <TextInput
          style={[props.style, styles.dtoTextInput]}
          value={props.value}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          onChangeText={props.onChangeText}
          placeholderTextColor={colors.text}
          autoFocus={props.autoFocus}
          secureTextEntry={props.secureTextEntry && hidePassword}
          multiline={props.multiline}
          numberOfLines={props.numberOfLines}
        />
        <View style={styles.iconStart}>{props.iconStart}</View>
        {props.passwordShowable && (
          <View style={styles.iconEnd}>
            <TouchableWithoutFeedback
              onPress={() => sethidePassword(!hidePassword)}>
              <Icon
                name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color={colors.text}
              />
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
      {props.error && (
        <Text style={{fontSize: textSize.SM, color: colors.danger}}>*{props.error}</Text>
      )}
    </View>
  );
};

export default DtoInput;
