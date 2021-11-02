import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SharedStateProvider} from 'store/store';
import theme from 'styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const Providers: React.FC = ({children}) => {
  return (
    <SharedStateProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </SharedStateProvider>
  );
};

export default Providers;
