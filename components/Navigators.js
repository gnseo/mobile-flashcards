import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Platform } from 'react-native';
import { Foundation } from '@expo/vector-icons'

import Decks from './Decks'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import AddDeck from './AddDeck'
import Quiz from './Quiz'

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

export const MainNavigator = StackNavigator({
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
