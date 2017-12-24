import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Foundation } from '@expo/vector-icons'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'

import Decks from './components/Decks'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import StatusBar from './components/StatusBar'
import Quiz from './components/Quiz'

import { setLocalNotification } from './utils/helpers'

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'Decks',
      tabBarIcon: ({ tintColor }) => <Foundation name='list' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Foundation name='list' size={30} color={tintColor} />
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: Platform.OS === 'ios' ? {} : {header: null},
  },
  DeckDetail: {
    screen: DeckDetail
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  }
})

const store = createStore(
  reducer
)

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor={'darkblue'} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
