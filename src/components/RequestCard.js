import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {colors} from '../constant/colors';
import {requestUtil} from '../utils/request';
import {layoutSize, textSize} from '../constant/size';

const RequestCard = props => {
  const getRequestStatus = status => {
    if (status === 'Pending') {
      return [styles.status, styles.pending];
    }
    if (status === 'Accepted') {
      return [styles.status, styles.accepted];
    }
    if (status === 'Completed') {
      return [styles.status, styles.completed];
    }
    if (status === 'Canceled') {
      return [styles.status, styles.canceled];
    }
  };

  const styles = StyleSheet.create({
    requestCard: {
      display: 'flex',
      // gap: layoutSize.MD,
      backgroundColor: colors.primary,
      borderWidth: 1,
      borderColor: colors.lightGray,
      padding: layoutSize.MD,
      borderRadius: layoutSize.MD,
      // elevation: 4,
    },
    cardContentContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontWeight: 'bold',
      fontSize: textSize.MD,
      color: colors.black,
    },
    value: {
      color: colors.gray,
    },
    status: {
      paddingHorizontal: layoutSize.XS,
      borderRadius: layoutSize.XXS,
    },
    pending: {
      color: colors.gray,
      backgroundColor: colors.pending,
    },
    accepted: {
      color: colors.white,
      backgroundColor: colors.accepted,
    },
    completed: {
      color: colors.white,
      backgroundColor: colors.accent,
    },
    canceled: {
      color: colors.lightGray,
      backgroundColor: colors.gray,
    },
  });

  //   console.log(props.request.item)

  return (
    <TouchableHighlight
      onPress={props.onPress}
      activeOpacity={0.6}
      underlayColor={colors.lightGrayUnderlay}
      style={styles.requestCard}>
      <View>
        {requestUtil
          .requestCardDetails(props.request.item)
          .map((item, index) => (
            <View key={index} style={styles.cardContentContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <Text
                style={[
                  styles.value,
                  item.label.includes('Status')
                    ? getRequestStatus(item.value)
                    : null,
                ]}>
                {item.value}
              </Text>
            </View>
          ))}
      </View>
    </TouchableHighlight>
  );
};

export default React.memo(RequestCard);
