import produce from 'immer';
import React from 'react';
import {TextInput, View} from 'react-native';
import {useSharedState} from 'store/store';
import Text from 'components/Text/Text';

const TextBox: React.FC = () => {
  const [state, setState] = useSharedState();
  const setText = (text: string) => {
    setState(
      produce(draft => {
        draft.text = text;
      }),
    );
  };
  return (
    <View>
      <Text variant="textBox">{state.text}</Text>
      <TextInput value={state.text} onChangeText={setText} />
    </View>
  );
};

export default TextBox;
