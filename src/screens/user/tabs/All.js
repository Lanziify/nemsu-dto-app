import {Text, View, FlatList} from 'react-native';
import React from 'react';
import {requestUtil} from '../../../utils/request';
import {colors} from '../../../constant/colors';
import {layoutSize} from '../../../constant/size';
import SkeletonRequestCard from '../../../components/SkeletonRequestCard';
import RequestCard from '../../../components/RequestCard';

const HEIGHT = 142.57142639160156;

const All = ({requests, loading, navigation}) => {
  const [flatListHeight, setFlatListHeight] = React.useState(0);

  const renderSkeletonLoader = () => {
    const numSkeletons = Math.floor(
      (flatListHeight - layoutSize.MD * Math.ceil(flatListHeight / HEIGHT)) /
        HEIGHT,
    );
    return new Array(numSkeletons)
      .fill(null)
      .map((_, index) => <SkeletonRequestCard key={index} />);
  };

  const onFlatListLayout = event => {
    const {height} = event.nativeEvent.layout;
    setFlatListHeight(height);
  };

  const handleCardClick = request => {
    navigation.navigate('Details', {request: request.item});
  };

  const RenderEmptyList = () => {
    return loading ? (
      renderSkeletonLoader()
    ) : (
      <View>
        <Text>You havent made any request yet</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={requestUtil.filteredList(null, requests, '')}
      onLayout={onFlatListLayout}
      keyExtractor={item => item.requestId}
      renderItem={item => (
        <RequestCard request={item} onPress={() => handleCardClick(item)} />
      )}
      ListEmptyComponent={RenderEmptyList}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: layoutSize.MD,
        paddingVertical: layoutSize.MD,
        paddingHorizontal: layoutSize.MD,
      }}
      style={{
        backgroundColor: colors.primary,
      }}
    />
  );
};

export default React.memo(All);
