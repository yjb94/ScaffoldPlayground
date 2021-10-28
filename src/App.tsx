import Counter from 'components/Counter';
import TextBox from 'components/TextBox';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {SharedStateProvider} from 'store/store';

const App: React.FC = () => (
  <SharedStateProvider>
    <SafeAreaView>
      <Counter />
      <TextBox />
    </SafeAreaView>
  </SharedStateProvider>
);

export default App;
