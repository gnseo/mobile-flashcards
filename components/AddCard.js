import React from 'react'
import { StyleSheet, TextInput, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'

class AddCard extends React.Component {

  state = {
    question: "",
    answer: ""
  }

  handleSubmit = () => {
    const card = {
      question: this.state.question,
      answer: this.state.answer
    }

    addCardToDeck({title: this.props.selectedDeck.title, card})

    this.props.dispatch(addCard({
      deckTitle: this.props.selectedDeck.title,
      ...card
    }))

    this.props.navigation.dispatch(NavigationActions.back())
  }

  render(){
    const deck = this.props.selectedDeck

    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput style={[styles.item, {}]}
            onChangeText={(value) => this.setState({question: value})}
            underlineColorAndroid='#fff'
          />
        <TextInput style={[styles.item, {}]}
            onChangeText={(value) => this.setState({answer: value})}
            underlineColorAndroid='#fff'
          />
        <TouchableOpacity
            style={[styles.item, {
              backgroundColor: '#555',
              alignItems: 'center'
            }]}
            onPress={() => this.handleSubmit()}>
          <Text style={styles.submitBtn}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    padding: 30,
  },

  item: {
    padding: 10,
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    marginBottom: 10
  },

  submitBtn: {
    fontSize: 20,
    color: 'white',
  }
});

function mapStateToProps(state){
  return{
    selectedDeck: state.selectedDeck
  }
}
export default connect(
  mapStateToProps
)(AddCard)
