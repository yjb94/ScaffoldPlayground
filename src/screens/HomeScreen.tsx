import Counter from 'components/Counter';
import TextBox from 'components/TextBox';
import React from 'react';
import {View} from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Counter />
      <TextBox />
    </View>
  );
};

export default HomeScreen;
