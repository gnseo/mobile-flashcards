import { SET_DECKS_TO_STATE, ADD_CARD, SELECT_DECK, ADD_DECK } from '../actions'

const initialState = {
  list: {},
  selectedDeck: null,
  isLoading: true
}

function decks (state = initialState, action) {
  switch (action.type) {
    case SET_DECKS_TO_STATE:
      return {
        list: {
          ...action.decks
        },
        selectedDeck: null,
        isLoading: false
      }
    case SELECT_DECK:
      return {
        ...state,
        selectedDeck: Object.keys(action.deck).reduce((result, key) => {
                  result[key] = action.deck[key]
                  return result
                }, {}),
      }
    case ADD_CARD:
      return {
        ...state,
        list: Object.keys(state.list).reduce((result, key) => {
            result[key] = state.list[key]

            if ( state.list[key].title === action.card.deckTitle ){
              result[key].questions.push({
                question: action.card.question,
                answer: action.card.answer
              })
            }
            return result
          }, {}),
        selectedDeck: Object.keys(state.selectedDeck).reduce((result, key) => {
            result[key] = state.selectedDeck[key]

            if ( key === 'questions' ){
              result[key].push({
                question: action.card.question,
                answer: action.card.answer
              })
            }
            return result
          }, {}),
      }
    case ADD_DECK:
      return {
        ...state,
        list: Object.keys(state.list).concat([action.deck.title]).reduce((result, key) => {
            if ( key in state.list ){
              result[key] = state.list[key]
            }else{
              result[key] = { title: action.deck.title, questions: [] }
            }
            return result
          }, {}),
        selectedDeck: null
      }
    default :
      return state
  }
}

export default decks
