import {boolean} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import Providers from 'Providers';
import React from 'react';
import Button from './Button';

storiesOf('Button', module)
  .addDecorator(getStory => <Providers>{getStory()}</Providers>)
  .add('default', () => <Button title="Click me" />)
  .add('loading', () => <Button title="Fetching..." isLoading={true} />)
  .add('disablled', () => (
    <Button title="Not available" disabled={boolean('Disabled', true)} />
  ))
  .add('change text color', () => (
    <Button title="Which color am i" color="purplePrimary" />
  ));
