import Counter from 'components/Counter';
import TextBox from 'components/TextBox';
import Providers from 'Providers';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Config from 'react-native-config';
import StorybookUI from '../storybook';

const App: React.FC = () => (
  <Providers>
    <SafeAreaView>
      <Counter />
      <TextBox />
    </SafeAreaView>
  </Providers>
);

export default Config.LOAD_STORYBOOK === 'true' ? StorybookUI : App;
