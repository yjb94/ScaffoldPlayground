import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {SharedStateProvider} from 'store/store';
import theme from 'styles/theme';

const Providers: React.FC = ({children}) => {
  return (
    <SharedStateProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SharedStateProvider>
  );
};

export default Providers;
