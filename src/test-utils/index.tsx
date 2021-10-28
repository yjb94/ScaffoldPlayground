import Providers from 'Providers';
import React, {ReactElement} from 'react';
import rtRenderer, {TestRendererOptions} from 'react-test-renderer';

const render = (element: ReactElement, options?: TestRendererOptions) => {
  return rtRenderer.create(<Providers>{element}</Providers>, options);
};

export default render;
