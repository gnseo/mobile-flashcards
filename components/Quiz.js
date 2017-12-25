import React from 'react'
import { StyleSheet, TextInput, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { AppLoading } from 'expo'

//import { quiz } from '../actions'

const initialState = {
  showingQuestion: true,
  showingAnswer: false,
  count: 1,
  total: 0,
  correct: 0
}

class Quiz extends React.Component {

  state = initialState

  componentDidMount(){
    this.setState((state) => ( {
      total: this.props.selectedDeck.questions.length
    }))
  }

  handleSubmit = (correct) => {
    this.setState((state) => ({
      count: state.count + 1,
      showingAnswer: false,
      showingQuestion: true,
      correct: state.correct + correct
    }))
  }

  toggleContent(){
    this.state.showingAnswer
      ? this.setState({showingAnswer: false})
      : this.setState({showingAnswer: true})

    this.state.showingQuestion
      ? this.setState({showingQuestion: false})
      : this.setState({showingQuestion: true})
  }

  handleRestartQuiz(){
    this.setState({...initialState, total: this.props.selectedDeck.questions.length})
  }

  handleBackToDeck(){
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render(){
    const { count, total, correct, showingAnswer, showingQuestion } = this.state
    const { questions } = this.props.selectedDeck
    const index = count - 1

    {
      if ( count > total ){
        return (
          <View style={[styles.container, {
              alignItems: 'center',
              justifyContent: 'center',
            }]}>
            <Text style={{fontSize: 20}}>Score is {Math.round(correct / total * 100)}%.</Text>
            <View style={styles.item}>
              <TouchableOpacity style={styles.restartQuiz} onPress={()=>this.handleRestartQuiz()}>
                <Text>Restart Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backToDeck} onPress={()=>this.handleBackToDeck()}>
                <Text style={{color: '#fff',}}>Back to Deck</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
      if ( typeof questions[index] === 'undefined' ){
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>Loading...</Text>
          </View>
        )
      }
    }

    return (
      <View style={styles.container}>

        <Text style={{padding: 10, fontSize: 15}}>{count}/{total}</Text>

        <ScrollView contentContainerStyle={[styles.container, {
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 40,
            paddingBottom: 10,
          }]}>

          {
            showingQuestion && <Text style={styles.qna}>{questions[index].question}</Text>
          }

          {
            showingAnswer && <Text style={styles.qna}>{questions[index].answer}</Text>
          }

          <TouchableOpacity
              onPress={() => this.toggleContent()}
              style={{
                alignItems: 'center',
                padding: 10,
                marginBottom: 40,
              }}>
            <Text style={{color: 'red'}}>
              { showingAnswer && 'Question' }
              { showingQuestion && 'Answer' }
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={[styles.item, {
                backgroundColor: 'green'
              }]}
              onPress={() => this.handleSubmit(1)}>
                <Text style={styles.CoInBtn}>Corrent</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.item, {
                backgroundColor: 'crimson'
              }]}
              onPress={() => this.handleSubmit(0)}>
                <Text style={styles.CoInBtn}>Incorrent</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },

  item: {
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    marginBottom: 10
  },

  CoInBtn: {
    fontSize: 20,
    color: 'white',
  },

  qna: {
    fontSize: 30
  },

  restartQuiz: {
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  backToDeck: {
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

function mapStateToProps(state){
  return{
    selectedDeck: state.selectedDeck
  }
}

export default connect(
  mapStateToProps
)(Quiz)
