import deepFreeze from 'deep-freeze'
import anecdoteReducer from '../reducers/anecdoteReducer'

describe('anecdote reducer', () => {
 const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const initialState = anecdotesAtStart.map((anecdote, index) => ({
    content: anecdote,
    id: index + 1,
    votes: 0,
  }))

  test('should return a proper initial state when called with undefined state', () => {

    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('votes are incremented', () => {
    const action = {
      type: 'VOTE',
      payload: {
        id: initialState[1].id
      }
    }
    const state = initialState

    console.log('action payload: ', action.payload)

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toContainEqual({
        ...state[1], votes: state[1].votes + 1
    })
  })
})