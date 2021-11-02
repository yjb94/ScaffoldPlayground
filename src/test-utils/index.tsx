import Providers from 'Providers';
import React, {ReactElement} from 'react';
import {
  render as rntlRender,
  RenderOptions,
} from '@testing-library/react-native';

const render = (element: ReactElement, options?: RenderOptions) => {
  return rntlRender(<Providers>{element}</Providers>, options);
};

export default render;
