const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.'
]

const initialState = anecdotesAtStart.map((anecdote, index) => ({
  content: anecdote,
  id: index + 1,
  votes: 0,
}))

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.id
      const anecdoteToVote = state.find(anecdote => 
        anecdote.id === id
      )
      const votedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    case 'NEW_ANECDOTE':
      return state.concat(action.payload)
    default: return state
  }  
}

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content: content,
      id: generateId(),
      votes: 0
    }
  }
}

export default anecdoteReducer