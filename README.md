# React native init

사전에 brew, npx, Xcode 등은 기본적으로 설정되어있다고 가정합니다.

`npm version: 6.13.4`

```bash
npx react-native init ScaffoldPlayground --template react-native-template-typescript
```

typescript 탬플릿으로 scaffolding앱을 생성합니다

`react version: 17.0.2`

`react-native version: 0.66.1`

---

# Absolute path

상대경로를 절대경로로 바꿔주기 위해서 babel과 tsconfig를 조금 수정한다.

1. `App.tsx`파일 디렉토리를 `src/App.tsx`로 이동한다. (src폴더 생성)
2. `tsconfig.json` 파일에서 `baseUrl`을 설정한다.
    
    ```json
    {
    	...
    	"baseUrl": "./src" /* Base directory to resolve non-absolute module names. */,
    	...
    }
    ```
    
3. `yarn add --dev babel-plugin-module-resolver`
4. `babel.config.js` 수정
    
    ```jsx
    module.exports = {
      presets: ['module:metro-react-native-babel-preset'],
    //아래 추가
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src'],
            extensions: ['.ts', '.tsx', '.jsx'],
          },
        ],
      ],
    };
    ```
    
5. `index.js` 및 `App-test.tsx` 파일 임포트 경로 변경
    
    ```jsx
    import {AppRegistry} from 'react-native';
    import App from 'App';
    import {name as appName} from './app.json';
    ...
    ```
    
    ```tsx
    import 'react-native';
    import React from 'react';
    import App from 'App';
    ...
    ```
    

---

# react-tracked

## install

```bash
yarn add react-tracked scheduler
```

### project setting

react-tracked에서 제공하는 예제 코드로 동작을 확인합니다.

1. `src/store/store.tsx` 생성

```tsx
import React, {createContext, useState, useContext} from 'react';

const initialState = {
  count: 0,
  text: 'hello',
};

const useMyState = () => useState(initialState);

const MyContext = createContext<ReturnType<typeof useMyState> | null>(null);

export const useSharedState = () => {
  const value = useContext(MyContext);
  if (value === null) {
    throw new Error('Please add SharedStateProvider');
  }
  return value;
};

export const SharedStateProvider: React.FC = ({children}) => (
  <MyContext.Provider value={useMyState()}>{children}</MyContext.Provider>
);
```

1. `src/components/Counter` 생성

```tsx
import React from 'react';
import {Button, Text, View} from 'react-native';

import {useSharedState} from 'store/store';

const Counter: React.FC = () => {
  const [state, setState] = useSharedState();
  const increment = () => {
    setState(prev => ({...prev, count: prev.count + 1}));
  };
  return (
    <View>
      <Text>{state.count}</Text>
      <Button title="+1" onPress={increment} />
    </View>
  );
};

export default Counter;
```

1. `src/components/TextBox` 생성

```tsx
import React from 'react';
import {Text, TextInput, View} from 'react-native';

import {useSharedState} from 'store/store';

const TextBox: React.FC = () => {
  const [state, setState] = useSharedState();
  const setText = (text: string) => {
    setState(prev => ({...prev, text}));
  };
  return (
    <View>
      <Text>{state.text}</Text>
      <TextInput value={state.text} onChangeText={setText} />
    </View>
  );
};

export default TextBox;
```

1. `src/App.tsx` 수정

```tsx
import React from 'react';

import {SharedStateProvider} from 'store/store';
import Counter from 'components/Counter';
import TextBox from 'components/TextBox';
import {SafeAreaView} from 'react-native';

const App: React.FC = () => (
  <SharedStateProvider>
    <SafeAreaView>
      <Counter />
      <TextBox />
    </SafeAreaView>
  </SharedStateProvider>
);

export default App;
```

---

# Immer

## install

```bash
yarn add immer
```

## project setting

기존 react-tracked 로직을 변경합니다

1. `src/components/Counter.tsx` 수정
    
    ```tsx
    import produce from 'immer';
    import React from 'react';
    ...
    
    const Counter: React.FC = () => {
    	...
      const increment = () => {
        setState(
          produce(draft => {
            draft.count += 1;
          }),
        );
      };
    ...
    ```
    
2. `src/components/TextBox.tsx` 수정
    
    ```tsx
    import produce from 'immer';
    import React from 'react';
    ...
    
    const TextBox: React.FC = () => {
    	...
      const setText = (text: string) => {
        setState(
          produce(draft => {
            draft.text = text;
          }),
        );
      };
    ...
    ```
    

---

# restyle

## install

```bash
yarn add @shopify/restyle
```

## project setting

1. `src/styles/theme.ts` 생성

```tsx
import {createTheme} from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    ...palette,
    mainBackground: palette.white,
  },
  textVariants: {
    textBox: {
      fontSize: 16,
      lineHeight: 24,
      color: 'greenPrimary',
    },
    counter: {
      fontSize: 32,
      color: 'purplePrimary',
    },
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export default theme;
```

1. `src/App.tsx` 수정

```tsx
import {ThemeProvider} from '@shopify/restyle';
...
import theme from 'styles/theme';

const App: React.FC = () => (
  <SharedStateProvider>
    <ThemeProvider theme={theme}>
			...
    </ThemeProvider>
  </SharedStateProvider>
);

export default App;
```

1. `src/components/Text.tsx` 생성

```tsx
import {createText} from '@shopify/restyle';
import {Theme} from 'styles/theme';

const Text = createText<Theme>();

export default Text;
```

1. `src/components/TextBox.tsx` 수정

```tsx
import produce from 'immer';
import React from 'react';
import {TextInput, View} from 'react-native';
import {useSharedState} from 'store/store';
import Text from 'components/Text';

const TextBox: React.FC = () => {
	...
  return (
    <View>
      <Text variant="textBox">{state.text}</Text>
      <TextInput value={state.text} onChangeText={setText} />
    </View>
  );
};

export default TextBox;
```

1. `src/components/Counter.tsx` 수정

```tsx
import produce from 'immer';
import React from 'react';
import {Button, View} from 'react-native';
import {useSharedState} from 'store/store';
import Text from 'components/Text';

const Counter: React.FC = () => {
	...
  return (
    <View>
      <Text variant="counter">{state.count}</Text>
      <Button title="+1" onPress={increment} />
    </View>
  );
};

export default Counter;
```

---

# Storybook

## install

```bash
npx -p @storybook/cli sb init --type react_native
## 여기서 y를 눌러서 @storybook/react-native-server 설치를 선택해준다
```

## react-native-config

나중에 추가하려던 것이었는데, storybook loading할 때 env도 필요하다고 함.

```bash
yarn add react-native-config
```

→ setup은 [해당 오픈소스 도큐먼트](https://github.com/luggit/react-native-config#setup)에가서 하는게 가장 정확합니다. 

```bash
npx pod-install
```

app/build.gradle에서 맨 마지막 줄에

```bash
...
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```

`.env` 추가

```bash
LOAD_STORYBOOK=true
```

삽질 결과 Config를 사용해서 App을 분기로 export할 경우 react-query가 제대로 동작하지 않는 케이스가 있는 것을 확인. storybook 사용시에 따로 앱 실행하는 방법을 강구하도록 해야겠음

## storybook 실행

1. `src/App.tsx`에서

```bash
...
import StorybookUI from '../storybook';
import Config from 'react-native-config';

const App = () => {
  return (
		...
  )
}

export default Config.LOAD_STORYBOOK === 'true' ? StorybookUI : App
```

1. XCode에서 app 실행

## AsyncStorage 설치

storybook 5.3.0이상에서 config에 필요하다는 warning이 뜬다. 해결하기 위해서

```bash

# storybook 5.3.0이상에서 config에 필요
yarn add @react-native-async-storage/async-storage

```

`storybook/index.js` 수정

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withKnobs} from '@storybook/addon-knobs';
import {addDecorator, configure, getStorybookUI} from '@storybook/react-native';
import {AppRegistry} from 'react-native';
import './rn-addons';

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage,
});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
```

## Storybook loader

```bash
yarn add react-native-storybook-loader -D
```

1. `package.json` 수정

```json
{
	...
  "scripts": {
		...
    "prestorybook": "rnstl"
  }
	...,
	"config": {
    "react-native-storybook-loader": {
      "searchDir": [
        "./src"
      ],
      "pattern": "**/*.stories.tsx",
      "outputFile": "./storybook/storyLoader.js"
    }
  }
}
```

1. `storybook/index.js` 수정

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withKnobs} from '@storybook/addon-knobs';
import {addDecorator, configure, getStorybookUI} from '@storybook/react-native';
import {AppRegistry} from 'react-native';
import {loadStories} from './storyLoader';
import './rn-addons';

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage,
});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
```

1. storybook 재실행

```bash
yarn storybook
```

1. App 릴로드(command + R / hit r on react-native-console)

## 파일 정리

우리는 storybook에서 스토리를 관리하지 않고 필요한 컴포넌트 옆에다 stories를 정의할 계획이기에 `storybook/stories/*`를 지워준다.

Text 컴포넌트를 실험적으로 stories로 만들기 위해 `components/Text` 디렉토리를 만들고 `Text.tsx`를 옮겨준다. (Counter.tsx, TextBox.tsx의 import) 경로 수정 필요)

## 스토리 생성

1. `src/components/Text/Text.stories.tsx` 생성

```tsx
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import Text from './Text';

storiesOf('Text', module).add('default', () => (
  <Text>{text('default text', 'Hello')}</Text>
));
```

1. 스토리 실행

```bash
yarn storybook
```

## Testing

1. async-storage mock데이터를 추가해야 하므로, `__mocks__/@react-native-async-storage/async-storage.js` 파일을 생성

```jsx
export default from '@react-native-async-storage/async-storage/jest/async-storage-mock';
```

1. `package.json` 수정

```json
	...
	"jest": {
    "preset": "react-native",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)"
    ]
  },
	...
```

1. `__mocks__/globalMock.js` 생성

```jsx
jest.mock('global', () => ({
  ...global,
  WebSocket: function WebSocket() {},
}));
jest.useFakeTimers();
```

1. `package.json` 수정

```json
...
"jest": {
		...
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)"
    ],
    "setupFilesAfterEnv": [
      "<rootDir>/__mocks__/globalMock.js"
    ]
  },
...
```

1. `yarn test` 실행 후 잘 되는지 확인

## Text 컴포넌트 테스팅

text 컴포넌트를 테스팅하기 위해서는 context들을 전달해주는 mock renderer가 필요하다.

1. `test-utils/index.tsx` 생성

```tsx
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
```

1. `__tests__/App-test.tsx` 삭제
2. `__tests__/Text-test` 생성

```tsx
import Text from 'components/Text/Text';
import React from 'react';
import 'react-native';
import render from 'test-utils';

it('Text color 지정', () => {
  render(<Text color={'greenPrimary'} />);
});
```

1. `yarn test` 로 테스트 확인

## Storybook 과 Test code 동기화

이 둘과 실제 App은 같은 Context들을 공유하는 것이 좋기 때문에 따로 Provider들을 빼준다. (아마 추후엔 mocking 데이터 때문에 App과는 다른 provider를 바라보게 될 수도 있다.)

1. `src/Providers.tsx` 생성

```tsx
import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {SharedStateProvider} from 'store/store';
import theme from 'styles/theme';

const Providers: React.FC = ({children}) => {
  return (
    <SharedStateProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SharedStateProvider>
  );
};

export default Providers;
```

1. `src/App.tsx` 수정

```tsx
...
import Providers from 'Providers';
...

const App: React.FC = () => (
  <Providers>
    <SafeAreaView>
      <Counter />
      <TextBox />
    </SafeAreaView>
  </Providers>
);
...
```

1. `src/components/Text/Text.stories.tsx` 수정

```tsx
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import Providers from 'Providers';
import React from 'react';
import Text from './Text';

storiesOf('Text', module)
  .addDecorator(getStory => <Providers>{getStory()}</Providers>)
  .add('default', () => <Text>{text('default text', 'Hello')}</Text>)
  .add('Text color 지정', () => (
    <Text color="greenPrimary">{text('colored text', 'I am colored')}</Text>
  ));
```

1. `src/test-utils/index.tsx` 수정

```tsx
import Providers from 'Providers';
...

const render = (element: ReactElement, options?: TestRendererOptions) => {
  return rtRenderer.create(<Providers>{element}</Providers>, options);
};

export default render;
```

## snapshot testing

1. install

```bash
yarn add --dev @storybook/addon-storyshots jest-static-stubs
```

1. `__tests__/storybook-test.ts` 생성

```tsx
import initStoryshots from '@storybook/addon-storyshots';
initStoryshots();
```

1. `pacakge.json` 수정

```tsx
...
"jest": {
  "preset": "react-native",
	...
	"moduleNameMapper": {
    ".+\\.(png)$": "jest-static-stubs/png"
  }
},
...
```

1. `yarn test` 실행
2. `__tests__/__snapshots__/` 에 스냅샷이 생성됨.
3. `src/components/Text/Text.stories.tsx` 에서 수정을 한 뒤에 다시 `yarn test` 실행

```tsx
...
storiesOf('Text', module)
  .addDecorator(getStory => <Providers>{getStory()}</Providers>)
  .add('default', () => <Text>{text('default text', 'Hello')}</Text>)
  .add('Text color 지정', () => (
    <Text color="purplePrimary">{text('colored text', 'I am colored')}</Text>
  ));
```

```bash
yarn test
```

→ 스냅샷과 다름로 에러가 뜬다.

여기서 정리, 기존에 Text-test.tsx 파일을 작성하여 테스트를 진행했지만 UI 단위 테스트를 할 때는 storybook에서의 testing만 하는 것이 바람직하다(관리 포인트를 줄이기 위함). 반면에 어떤 functional한 기능적인 테스팅(하트 누르기 등)은 따로 테스트코드를 작성하는 방향으로 진행하면 된다.

1. 만약 스냅샷이 다르지만 필요한 변화일 경우에는, `yarn jest --updateSnapshot` 을 사용해서 업데이트해준다.

이제 어느정도 testing, storybook을 연결했지만 제대로 테스팅과 스토리북을 통한 품질유지를 진행하려면 [여기](https://storybook.js.org/tutorials/design-systems-for-developers/react/ko/introduction/)에 있는 대로 설정이 필요하다. 주로 내용은 깃헙에 반영됐을 때 스토리북으로 실제 컴포넌트들을 확인([Chromatic](https://chromatic.com/))하고 동작에 대해 테스트하고 디자인 시스템을 더 견고하게 구축할 수 있다는 내용

---

# react-native-reanimated

## installation

```bash
yarn add react-native-reanimated@next
```

→ 자세한 install은 [공식 도큐먼트](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation) 참고

`babel.config.js` 수정

```bash
module.exports = {
	...
  plugins: [
		...
    'react-native-reanimated/plugin',
  ],
};
```

### Android

`android/app/build.gradle` 수정

```bash
project.ext.react = [
  enableHermes: true  // <- here | clean and rebuild if changing
]
```

`[MainApplication.java](http://MainApplication.java)` 수정

```java
import com.facebook.react.bridge.JSIModulePackage; // <- add
import com.swmansion.reanimated.ReanimatedJSIModulePackage; // <- add
...
private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
...

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected JSIModulePackage getJSIModulePackage() {
      return new ReanimatedJSIModulePackage(); // <- add
    }
  };
...
```

### iOS

```bash
npx pod-install
```

## jest setup

[](https://docs.swmansion.com/react-native-reanimated/docs/2.1.0/testing/)

1. `jest-setup.js` 파일 생성

```bash
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();
```

1. `package.json` 수정

```bash
...
	"jest": {
		...
    "setupFiles": [
      "./jest-setup.js"
    ],
		...
  },
...
```

애니메이션을 진행할 컴포넌트로 지금 있는 Text는 적절하지 않아서 Button 컴포넌트를 새로 만든다.

1. `src/components/Button/Button.tsx` 생성

```bash
import React from 'react';
import {ColorProps, createBox} from '@shopify/restyle';
import Text from 'components/Text/Text';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
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
  return (
    <ButtonBase
      flexDirection="row"
      paddingHorizontal="m"
      paddingVertical="s"
      backgroundColor="greenPrimary"
      {...otherProps}>
      <Text variant="button" color={color}>
        {title}
      </Text>
      {isLoading && <ActivityIndicator />}
    </ButtonBase>
  );
};

export default Button;
```

1. `src/components/Button/Button.stories.tsx` 생성

```bash
import {storiesOf} from '@storybook/react-native';
import Providers from 'Providers';
import React from 'react';
import Button from './Button';

storiesOf('Button', module)
  .addDecorator(getStory => <Providers>{getStory()}</Providers>)
  .add('default', () => <Button title="Click me" />)
  .add('loading', () => <Button title="Fetching..." isLoading={true} />)
  .add('change text color', () => (
    <Button title="Which color am i" color="purplePrimary" />
  ));
```

1. `src/styles/theme.ts` 수정

```bash
...
const theme = createTheme({
	...
  textVariants: {
		...
    button: {
      fontSize: 16,
      color: 'white',
    },
  },
	...
```

1. `yarn test` 로 동작 확인
2. 이제 애니메이션 테스트를 위해서 disabled 될 때를 위한 애니메이션을 넣어본다. `Button.tsx`에서

```bash
...
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Theme} from 'styles/theme';

...

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
    <Animated.View style={animatedStyle}>
      <ButtonBase
				...
      </ButtonBase>
    </Animated.View>
  );
};

export default Button;
```

1. `yarn test --updateSnapshot` 해준다

이런 방식으로 진행중이었는데, animation을 처리하는 것을 jest로 해보려고 하니 아예 애니메이션을 테스팅하거나 하는 것은 snapshot을 뜨거나 이런 식의 애니메이션을 아예 테스팅 하지 않는 것이 좋다고 함. 따라서 여기서 중단, 다음 스텝 진행

# react-navigation

## installation

```bash
yarn add @react-navigation/native
yarn add react-native-screens react-native-safe-area-context
```

### iOS

```bash
npx pod-install
```

### android

`MainActivity.java` 수정

```bash
package com.scaffoldplayground;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
	...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
}
```

## Stack navigation

```bash
yarn add @react-navigation/native-stack
```

1. `src/screens/HomeScreen.tsx` 생성

```tsx
import Counter from 'components/Counter';
import TextBox from 'components/TextBox';
import React from 'react';
import {View} from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Counter />
      <TextBox />
    </View>
  );
};

export default HomeScreen;
```

1. `src/screens/index.tsx` 생성

```tsx
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from 'screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Screens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
```

1. `src/App.tsx` 수정

```tsx
import Providers from 'Providers';
import React from 'react';
import Config from 'react-native-config';
import Screens from 'screens';
import StorybookUI from '../storybook';

const App: React.FC = () => (
  <Providers>
    <Screens />
  </Providers>
);

export default Config.LOAD_STORYBOOK === 'true' ? StorybookUI : App;
```

# react-query

## installation

```bash
yarn add react-query
```

## project setting

`src/Providers.tsx` 수정

```bash
import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SharedStateProvider} from 'store/store';
import theme from 'styles/theme';

const queryClient = new QueryClient();

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
```

shared state에서 추후 token을 가져와야되니 하위 hierarchy에 query provider를 넣어줍니다.

## util setting

```bash
yarn add axios
```

## testing api

API 테스트를 위해서 [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/) 를 사용합니다.

**리스트:** [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)

**상세:** [https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1)

iOS info.plist에서 [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)의 `NSExceptionAllowsInsecureHTTPLoads`를 true로 설정합니다.

삽질 결과 Config를 사용해서 App을 분기로 export할 경우 react-query가 제대로 동작하지 않는 케이스가 있는 것을 확인. storybook 사용시에 따로 앱 실행하는 방법을 강구하도록 해야겠음

### post listing

Post type을 설정해주기 위해 `src/types/post.d.ts` 생성

```tsx
type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};
```

1. `src/hooks/usePosts.ts` 생성

```tsx
import axios from 'axios';
import {useQuery} from 'react-query';

const getPosts = async (): Promise<Array<Post>> => {
  const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

export const usePosts = () => {
  return useQuery('posts', getPosts);
};
```

1. `src/components/PostList.tsx` 생성

```tsx
import Text from 'components/Text/Text';
import {usePosts} from 'hooks/usePosts';
import React from 'react';
import {FlatList, FlatListProps, View} from 'react-native';

interface PostListProps
  extends Omit<FlatListProps<Post>, 'renderItem' | 'data'> {}

const PostList: React.FC<PostListProps> = ({...otherProps}) => {
  const {data} = usePosts();

  const renderItem: FlatListProps<Post>['renderItem'] = ({item}) => {
    return (
      <View>
        <Text fontSize={24}>{item.title}</Text>
        <Text fontSize={16}>{item.body}</Text>
      </View>
    );
  };

  return <FlatList {...otherProps} data={data} renderItem={renderItem} />;
};

export default PostList;
```

1. `src/screens/HomeScreen.tsx` 수정

```tsx
import Counter from 'components/Counter';
import PostList from 'components/List/PostList';
import TextBox from 'components/TextBox';
import React from 'react';
import { View } from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Counter />
      <TextBox />
      <PostList />
    </View>
  );
};

export default HomeScreen;
```

### Suspense 설정

1. `/src/Providers.tsx` 수정

```tsx
...
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
```

1. `src/screens/HomeScreen.tsx` 수정

```tsx
import Counter from 'components/Counter';
import PostList from 'components/List/PostList';
import TextBox from 'components/TextBox';
import React, {Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Counter />
      <TextBox />
      <Suspense fallback={<ActivityIndicator />}>
        <PostList />
      </Suspense>
    </View>
  );
};

export default HomeScreen;
```

### post detail screen

1. `src/hooks/usePost.ts` 생성

```tsx
import axios from 'axios';
import {useQuery} from 'react-query';

const getPost = async (id: number): Promise<Post> => {
  const {data} = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  return data;
};

export const usePost = (id: number) => {
  return useQuery(['post', id], () => getPost(id), {
    enabled: !!id,
  });
};
```

1. `src/screens/index.tsx` 수정

```tsx
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from 'screens/HomeScreen';
import PostDetailScreen from './PostDetailScreen';

export type HomeStackParamList = {
  Home: undefined;
  PostDetail: {
    id: Post['id'];
  };
};

const Stack = createNativeStackNavigator();

const Screens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
```

1. `src/screens/PostDetailScreen.tsx` 생성

```tsx
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import PostDetail from 'components/PostDetail';
import React, {Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {HomeStackParamList} from 'screens';

type PostDetailScreenRouteProp = RouteProp<HomeStackParamList, 'PostDetail'>;

type PostDetailScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'PostDetail'
>;

type PostDetailProps = {
  route: PostDetailScreenRouteProp;
  navigation: PostDetailScreenNavigationProp;
};

const PostDetailScreen: React.FC<PostDetailProps> = ({route}) => {
  const {id} = route.params;

  return (
    <View>
      <Suspense fallback={<ActivityIndicator />}>
        <PostDetail id={id} />
      </Suspense>
    </View>
  );
};

export default PostDetailScreen;
```

1. `src/components/PostDetail.tsx` 생성

```tsx
import {usePost} from 'hooks/usePost';
import React from 'react';
import {View} from 'react-native';
import Text from 'components/Text/Text';

export type PostDetailProps = {
  id: Post['id'];
};

const PostDetail: React.FC<PostDetailProps> = ({id}) => {
  const {data} = usePost(id);

  return (
    <View>
      <Text fontSize={24}>{data?.title}</Text>
      <Text fontSize={16}>{data?.body}</Text>
    </View>
  );
};

export default PostDetail;
```

1. `src/components/List/PostList.tsx` 수정

```tsx
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button from 'components/Button/Button';
import Text from 'components/Text/Text';
import {usePosts} from 'hooks/usePosts';
import React from 'react';
import {FlatList, FlatListProps, View} from 'react-native';
import {HomeStackParamList} from 'screens';

interface PostListProps
  extends Omit<FlatListProps<Post>, 'renderItem' | 'data'> {}

const PostList: React.FC<PostListProps> = ({...otherProps}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const {data} = usePosts();

  const renderItem: FlatListProps<Post>['renderItem'] = ({item}) => {
    return (
      <View>
        <Text fontSize={24}>{item.title}</Text>
        <Text fontSize={16}>{item.body}</Text>
        <Button
          title="detail"
          onPress={() => navigation.push('PostDetail', {id: item.id})}
        />
      </View>
    );
  };

  return <FlatList {...otherProps} data={data} renderItem={renderItem} />;
};

export default PostList;
```
