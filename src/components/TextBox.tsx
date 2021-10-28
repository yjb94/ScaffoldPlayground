import produce from 'immer';
import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {useSharedState} from 'store/store';

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
      <Text>{state.text}</Text>
      <TextInput value={state.text} onChangeText={setText} />
    </View>
  );
};

export default TextBox;
