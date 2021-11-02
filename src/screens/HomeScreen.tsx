import Counter from 'components/Counter';
import PostList from 'components/List/PostList';
import TextBox from 'components/TextBox';
import React, {Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Counter />
      <TextBox />
      <Suspense fallback={<ActivityIndicator />}>
        <PostList />
      </Suspense>
    </View>
  );
};

export default HomeScreen;
