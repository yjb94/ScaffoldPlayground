import {ColorProps, createBox} from '@shopify/restyle';
import Text from 'components/Text/Text';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Theme} from 'styles/theme';

const ButtonBase = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

export interface ButtonProps
  extends React.ComponentProps<typeof ButtonBase>,
    ColorProps<Theme> {
  title: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  color,
  isLoading,
  ...otherProps
}) => {
  const {disabled} = otherProps;

  useEffect(() => {
    opacity.value = withTiming(disabled ? 0.2 : 1, {
      duration: 200,
      easing: Easing.ease,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View testID="button-animated-view" style={animatedStyle}>
      <ButtonBase
        accessibilityRole="button"
        flexDirection="row"
        paddingHorizontal="m"
        paddingVertical="s"
        backgroundColor="greenPrimary"
        {...otherProps}>
        <Text variant="button" accessibilityRole="text" color={color}>
          {title}
        </Text>
        {isLoading && <ActivityIndicator />}
      </ButtonBase>
    </Animated.View>
  );
};

export default Button;
