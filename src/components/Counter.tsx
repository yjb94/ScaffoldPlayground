import produce from 'immer';
import React from 'react';
import {Button, View} from 'react-native';
import {useSharedState} from 'store/store';
import Text from 'components/Text';

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
      <Text variant="counter">{state.count}</Text>
      <Button title="+1" onPress={increment} />
    </View>
  );
};

export default Counter;
