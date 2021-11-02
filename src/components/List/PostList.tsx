import {useNavigation} from '@react-navigation/native';
import Button from 'components/Button/Button';
import Text from 'components/Text/Text';
import {usePosts} from 'hooks/usePosts';
import React from 'react';
import {FlatList, FlatListProps, View} from 'react-native';

interface PostListProps
  extends Omit<FlatListProps<Post>, 'renderItem' | 'data'> {}

const PostList: React.FC<PostListProps> = ({...otherProps}) => {
  const navigation = useNavigation();
  const {data} = usePosts();

  const renderItem: FlatListProps<Post>['renderItem'] = ({item}) => {
    return (
      <View>
        <Text fontSize={24}>{item.title}</Text>
        <Text fontSize={16}>{item.body}</Text>
        <Button
          title="detail"
          onPress={() => navigation.push('PostDetail', {id: item.id})}
        />
      </View>
    );
  };

  return <FlatList {...otherProps} data={data} renderItem={renderItem} />;
};

export default PostList;
