import React from 'react'
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard,
    Alert
  } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { addDeck, selectDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

class AddDeck extends React.Component {

  state = {
    title: "",
  }

  validateEntries(){
    if ( this.state.title === "" ){
      Alert.alert(
        'Empty Entries',
        'Please fill the entries',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      )
    }else{
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    const newDeck = {
      title: this.state.title,
      questions: []
    }

    saveDeckTitle({title: newDeck.title})

    this.props.dispatch(addDeck({
      title: newDeck.title
    }))

    this.props.dispatch(selectDeck(newDeck))
    this.props.navigation.navigate(
      'DeckDetail',
      {deck: newDeck}
    )

    this.setState({title: ""})

    Keyboard.dismiss()

  }

  render(){
    const title = this.state.title

    return (
      <View style={styles.container}>
        <Text style={{padding: 20, fontSize: 25}}>What is the title of your new deck?</Text>

        <KeyboardAvoidingView behavior="padding">
          <TextInput
              style={[styles.item, {fontSize: 20}]}
              underlineColorAndroid='#fff'
              onChangeText={(value) => this.setState({title: value})}
              value={title}/>
          <TouchableOpacity
              style={[styles.item, {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#333'
              }]}
              onPress={() => this.validateEntries()}>
            <Text style={styles.submitBtn}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
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

export default connect(
  //mapStateToProps
)(AddDeck)
