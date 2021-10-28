import {ThemeProvider} from '@shopify/restyle';
import Counter from 'components/Counter';
import TextBox from 'components/TextBox';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {SharedStateProvider} from 'store/store';
import theme from 'styles/theme';

const App: React.FC = () => (
  <SharedStateProvider>
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <Counter />
        <TextBox />
      </SafeAreaView>
    </ThemeProvider>
  </SharedStateProvider>
);

export default App;
