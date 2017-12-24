import { AsyncStorage } from 'react-native'

import { setDecksToState } from '../actions'

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

const initialDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks (dispatch) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      let data = JSON.parse(results)

      if ( data === null ){
        data = initialDecks
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
      }

      dispatch(setDecksToState(data))
    })
}

export function saveDeckTitle ({ title }) {
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: { title: title, questions: [] }
  }))
}

export function addCardToDeck ({ title, card }) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const deck = data[title]

      deck.questions.push(card)

      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: deck
      }))
    })
}

export function resetStorage (dispatch) {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(null))
    .then((result) => {
      dispatch(setDecksToState(initialDecks))
    })
}

export function removeEntry (key) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}
