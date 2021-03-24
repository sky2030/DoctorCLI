import React from 'react';
import {Appbar} from 'react-native-paper';

export default function AppHeader({
  leftIconOnPress,
  title,
  rightIconOnPress,
  rightText,
}) {
  return (
    <Appbar.Header theme={theme}>
      <Appbar.BackAction onPress={leftIconOnPress} />
      <Appbar.Content title={title} />
      {rightText && <Appbar.Content title={rightText} style={{fontSize: 14}} />}
      {rightIconOnPress && (
        <Appbar.Action icon="calendar" onPress={rightIconOnPress} />
      )}
    </Appbar.Header>
  );
}
const theme = {
  colors: {
    primary: '#e01d5e',
  },
};
