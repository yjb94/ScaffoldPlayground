import Providers from 'Providers';
import React from 'react';
import Config from 'react-native-config';
import Screens from 'screens';
import StorybookUI from '../storybook';

const App: React.FC = () => (
  <Providers>
    <Screens />
  </Providers>
);

export default Config.LOAD_STORYBOOK === 'true' ? StorybookUI : App;
