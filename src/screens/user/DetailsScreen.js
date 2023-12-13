import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {layoutSize, textSize} from '../../constant/size';
import {colors} from '../../constant/colors';
import {requestUtil} from '../../utils/request';
import DtoLogo from '../../components/DtoLogo';
import {appName, schoolCampus, schoolName} from '../../constant/strings';

const DetailsScreen = ({route}) => {
  const {request} = route.params;

  const RenderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLogoContainer}>
          <DtoLogo width={28} height={28} fill={colors.accent} />
          <Text style={styles.heading}>{appName}</Text>
        </View>
        <Text style={styles.text}>{schoolName}</Text>
        <Text style={styles.text}>{schoolCampus}</Text>
        <View style={{width: "100%", marginTop: layoutSize.LG}}>
          <Text style={[styles.heading, {color: colors.black}]}>Request Details</Text>
        </View>
      </View>
    );
  };

  const RenderFooter = () => {
    return request.status === 'Completed' ? (
      <View style={styles.actionTakenContainer}>
        <Text style={[styles.heading, {color: colors.white}]}>Action Details</Text>
        {requestUtil.actionTakenDetails(request).map((item, index) => (
          <View key={index} style={styles.actionTakenContent}>
            <Text style={[styles.label, {color: colors.white}]}>{item.label}</Text>
            <Text style={[styles.text, {color: colors.white}]}>{item.value}</Text>
          </View>
        ))}
      </View>
    ) : null;
  };

  const RenderItem = props => {
    return (
      <View
        style={[
          styles.cardContentContainer,
          {
            flexDirection: props.item.label.toLowerCase().includes('complaints')
              ? 'column'
              : 'row',
          },
        ]}
        key={props.item.label}>
        <Text style={styles.label}>{props.item.label}</Text>
        <Text
          style={[
            styles.value,
            props.item.label.includes('Status')
              ? getRequestStatus(props.item.value)
              : null,
            props.item.label.toLowerCase().includes('complaints')
              ? styles.complaints
              : null,
          ]}>
          {props.item.value}
        </Text>
      </View>
    );
  };

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
      backgroundColor: colors.lightGray,
      padding: layoutSize.MD,
      borderRadius: layoutSize.SM,
      gap: layoutSize.XS,
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: layoutSize.SM,
    },
    headerLogoContainer: {
      gap: layoutSize.XS,
      flexDirection: 'row',
      alignItems: 'center',
      padding: layoutSize.MD,
    },
    cardContentContainer: {
      justifyContent: 'space-between',
    },
    actionTakenContainer: {
      gap: layoutSize.SM,
      padding: layoutSize.MD,
      backgroundColor: colors.accent,
      marginTop: layoutSize.MD,
      borderRadius: layoutSize.SM,
    },
    actionTakenContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    heading: {
      fontWeight: '900',
      fontSize: textSize.LG,
      color: colors.accent,
    },
    text: {
      color: colors.gray,
    },
    label: {
      fontWeight: '500',
      fontSize: textSize.MD,
      color: colors.black,
    },
    value: {
      color: colors.gray,
    },
    status: {
      paddingHorizontal: layoutSize.XS,
      borderRadius: layoutSize.XXS,
      width: 'auto',
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
    complaints: {
      marginTop: layoutSize.XS,
    },
  });

  return (
    <FlatList
      data={requestUtil.requestDetails(request)}
      keyExtractor={item => item.label.replace(' ', '').toUpperCase()}
      ListHeaderComponent={RenderHeader}
      ListFooterComponent={RenderFooter}
      renderItem={RenderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: layoutSize.XS,
        paddingVertical: layoutSize.MD,
        paddingHorizontal: layoutSize.MD,
        
      }}
      style={{
        backgroundColor: colors.primary,
      }}
    />
  );
};

export default DetailsScreen;
