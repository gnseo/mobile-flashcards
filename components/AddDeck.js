import React from 'react'
import { StyleSheet, TextInput, Text, View, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

class AddDeck extends React.Component {

  state = {
    title: "",
  }

  handleSubmit = () => {
    saveDeckTitle({title: this.state.title})

    this.props.dispatch(addDeck({
      title: this.state.title
    }))

    this.setState({title: ""})

    Keyboard.dismiss()

    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
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
              onPress={this.handleSubmit}>
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
