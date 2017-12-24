import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

import { setDecksToState, selectDeck } from '../actions'
import { getDecks, resetStorage } from '../utils/api'

class Decks extends React.Component {
  componentDidMount(){
    getDecks(this.props.dispatch)
  }

  resetDecks(){
    resetStorage(this.props.dispatch)
  }

  render(){
    {
      if ( this.props.isLoading === true ){
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>Loading...</Text>
          </View>
        )
      }
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.decksArray}
          renderItem={({item}) => (
            !('questions' in item) && item.resetBtn
            ? <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={[styles.item, styles.itemResetBtn]} onPress={() => this.resetDecks()}>
                  <Text style={styles.resetBtn}>Reset</Text>
                </TouchableOpacity>
              </View>
            : <View style={{flex: 1, alignItems: 'stretch'}}>
                <TouchableOpacity
                  key={item.key}
                  style={styles.item}
                  onPress={() => {
                    this.props.dispatch(selectDeck(
                      {
                        title: item.title,
                        questions: [...item.questions]
                      }
                    ))
                    this.props.navigation.navigate(
                      'DeckDetail',
                      {deck: item}
                    )
                  }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.count}>{item.questions ? item.questions.length : 0} cards</Text>
                </TouchableOpacity>
              </View>
          )}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  item: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#ddd'
  },
  title: {
    fontSize: 30,
    padding: 20
  },
  count: {
    padding: 10,
    color: 'gray'
  },
  itemResetBtn: {
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'crimson',
    width: 200,
  },
  resetBtn: {
    padding: 20,
    fontSize: 20,
    color: 'white'
  }
});

function mapStateToProps (state) {
  return {
    decksArray: Object.keys(state.list).map(title => {
      return {
        ...state.list[title],
        key: title
      }
    }).concat([{key: 'resetBtn', resetBtn: true}]),
    isLoading: state.isLoading
  }
}

export default connect(
  mapStateToProps
)(Decks)
