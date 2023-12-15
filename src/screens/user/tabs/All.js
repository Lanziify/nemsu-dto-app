import {Text, View, FlatList} from 'react-native';
import React from 'react';
import {requestUtil} from '../../../utils/request';
import {colors} from '../../../constant/colors';
import {layoutSize} from '../../../constant/size';
import SkeletonRequestCard from '../../../components/SkeletonRequestCard';
import RequestCard from '../../../components/RequestCard';

const HEIGHT = 142.57142639160156;

const All = ({requests, loading, navigation}) => {
  const [itemInitialCount, setItemInitialCount] = React.useState(1);

  const onFlatListLayout = event => {
    const {height} = event.nativeEvent.layout;
    const count = Math.floor(
      (height - layoutSize.MD * Math.ceil(height / HEIGHT)) / HEIGHT,
    );
    setItemInitialCount(count);
  };

  const renderSkeletonLoader = () => {
    return Array(itemInitialCount)
      .fill()
      .map((_, index) => <SkeletonRequestCard key={index} />);
  };

  const handleCardClick = request => {
    navigation.navigate('Details', {request: request.item});
  };

  const RenderEmptyList = () => {
    return loading ? (
      renderSkeletonLoader()
    ) : (
      <View style={{ alignItems: 'center'}}>
        <Text>You havent made any request yet</Text>
      </View>
    );
  };

  return (
    <FlatList
      onLayout={onFlatListLayout}
      data={requestUtil.filteredList(null, requests, '')}
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

export default React.memo(All);
