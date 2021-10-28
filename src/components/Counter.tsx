import produce from 'immer';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {useSharedState} from 'store/store';

const Counter: React.FC = () => {
  const [state, setState] = useSharedState();
  const increment = () => {
    setState(
      produce(draft => {
        draft.count += 1;
      }),
    );
  };
  return (
    <View>
      <Text>{state.count}</Text>
      <Button title="+1" onPress={increment} />
    </View>
  );
};

export default Counter;
