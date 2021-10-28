import Text from 'components/Text/Text';
import React from 'react';
import 'react-native';
import render from 'test-utils';

it('Text color 지정', () => {
  render(<Text color={'greenPrimary'} />);
});
