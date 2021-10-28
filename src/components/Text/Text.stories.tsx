import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import Text from './Text';

storiesOf('Text', module).add('default', () => (
  <Text>{text('default text', 'Hello')}</Text>
));
