import React from 'react';
import { View, StatusBar as ReactNativeStatusBar } from 'react-native';
import { Constants } from 'expo'

export default function StatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <ReactNativeStatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
