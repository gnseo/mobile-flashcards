import React from 'react';
import { View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import StatusBar from './components/StatusBar'
import reducer from './reducers'
import { MainNavigator } from './components/Navigators'
import { setLocalNotification } from './utils/helpers'

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor={'darkblue'} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
