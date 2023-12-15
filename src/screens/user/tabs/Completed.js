import {Text, View, FlatList} from 'react-native';
import React from 'react';
import {requestUtil} from '../../../utils/request';
import {colors} from '../../../constant/colors';
import {layoutSize} from '../../../constant/size';
import SkeletonRequestCard from '../../../components/SkeletonRequestCard';
import RequestCard from '../../../components/RequestCard';

const Completed = ({requests, loading, navigation}) => {
  const renderSkeletonLoader = () => {
    return [1, 2, 3].map((_, index) => <SkeletonRequestCard key={index} />);
  };

  const handleCardClick = request => {
    navigation.navigate('Details', {request: request.item});
  };

  const RenderEmptyList = () => {
    return loading ? (
      renderSkeletonLoader()
    ) : (
      <View style={{alignItems: 'center'}}>
        <Text>You havent made any request yet</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={requestUtil.filteredList(null, requests, 'Completed')}
      keyExtractor={item => item.requestId}
      renderItem={item => (
        <RequestCard request={item} onPress={() => handleCardClick(item)} />
      )}
      ListEmptyComponent={RenderEmptyList}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View
          style={{
            backgroundColor: colors.lightGrayUnderlay,
            height: 1,
          }}
        />
      )}
      style={{
        backgroundColor: colors.primary,
      }}
    />
  );
};

export default React.memo(Completed);
