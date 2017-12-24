import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

class DeckDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      title: `${deck.title}`
    }
  }

  handleAddCard(){
    this.props.navigation.navigate('AddCard')
  }

  handleStartQuiz(){
    this.props.navigation.navigate('Quiz')
  }

  render(){
    //const { deck } = this.props.navigation.state.params
    const deck = this.props.selectedDeck

    return (
      <View style={styles.container}>
        {
          deck &&
              <View style={styles.item}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.count}>{deck.questions ? deck.questions.length : 0} cards</Text>
              </View>
        }
        <View style={styles.item}>
          <TouchableOpacity style={styles.addCardBtn} onPress={() => this.handleAddCard()}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startQuizBtn} onPress={() => this.handleStartQuiz()}>
            <Text style={{color: '#fff',}}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50
  },
  title: {
    padding: 10,
    fontSize: 30,
  },
  count: {
    padding: 10,
    color: '#999'
  },
  addCardBtn: {
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  startQuizBtn: {
    marginTop: 20,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: '#111'
  }
});

function mapStateToProps (state) {
  return {
    selectedDeck: state.selectedDeck,
  }
}

export default connect(
  mapStateToProps
)(DeckDetail)
