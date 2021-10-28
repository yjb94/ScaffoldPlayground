import React, {ReactElement} from 'react';
import {ThemeProvider} from '@shopify/restyle';
import rtRenderer, {TestRendererOptions} from 'react-test-renderer';
import theme from 'styles/theme';

const render = (element: ReactElement, options?: TestRendererOptions) => {
  return rtRenderer.create(
    <ThemeProvider theme={theme}>{element}</ThemeProvider>,
    options,
  );
};

export default render;
