import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import PostDetail from 'components/PostDetail';
import React, {Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {HomeStackParamList} from 'screens';

type PostDetailScreenRouteProp = RouteProp<HomeStackParamList, 'PostDetail'>;

type PostDetailScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'PostDetail'
>;

type PostDetailProps = {
  route: PostDetailScreenRouteProp;
  navigation: PostDetailScreenNavigationProp;
};

const PostDetailScreen: React.FC<PostDetailProps> = ({route}) => {
  const {id} = route.params;

  return (
    <View>
      <Suspense fallback={<ActivityIndicator />}>
        <PostDetail id={id} />
      </Suspense>
    </View>
  );
};

export default PostDetailScreen;
