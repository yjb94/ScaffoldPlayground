import {fireEvent} from '@testing-library/react-native';
import Button from 'components/Button/Button';
import React from 'react';
import 'react-native';
import render from 'test-utils';

test('버튼 클릭 동작 테스트', () => {
  const onPressMock = jest.fn();
  const {getByTestId} = render(
    <Button testID="buttonClickTest" title="test" onPress={onPressMock} />,
  );
  fireEvent(getByTestId('buttonClickTest'), 'onPress', 'pressed');
  expect(onPressMock).toHaveBeenCalledWith('pressed');
});
