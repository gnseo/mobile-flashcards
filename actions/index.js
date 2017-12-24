export const SET_DECKS_TO_STATE = 'SET_DECKS_TO_STATE'
export const ADD_CARD = 'ADD_CARD'
export const SELECT_DECK = 'SELECT_DECK'
export const ADD_DECK = 'ADD_DECK'

export function setDecksToState (decks) {
  return {
    type: SET_DECKS_TO_STATE,
    decks,
  }
}

export function addCard(card){
  return {
    type: ADD_CARD,
    card
  }
}

export function selectDeck(deck){
  return {
    type: SELECT_DECK,
    deck
  }
}

export function addDeck(deck){
  return {
    type: ADD_DECK,
    deck
  }
}
