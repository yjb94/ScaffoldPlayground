import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import Providers from 'Providers';
import React from 'react';
import Text from './Text';

storiesOf('Text', module)
  .addDecorator(getStory => <Providers>{getStory()}</Providers>)
  .add('default', () => <Text>{text('default text', 'Hello')}</Text>)
  .add('Text color 지정', () => (
    <Text color="purplePrimary">{text('colored text', 'I am colored')}</Text>
  ));
