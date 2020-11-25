import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'CREATE_ANECDOTE':
      return [...state, action.data].sort((a,b) => b.votes-a.votes)
    case 'INIT_ANECDOTES':
      return action.data.sort((a,b) => b.votes-a.votes)
    case 'VOTE': {
      const { id } = action.data
      const anecdote = state.find((n) => n.id === id)
      const updatedAnecdote = {...anecdote, votes: anecdote.votes+1}
      const updatedState = state.map((anecdote) => (anecdote.id !== id ? anecdote : updatedAnecdote))
      return updatedState.sort((a,b) => b.votes-a.votes)
    }
    default:
      return state
  }
}

export const createAnecdote = (anecdote) => (
  async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    })
  }
)

export const initAnecdotes = () => (
  async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
)

export const voteAnecdote = (id) => (
  async (dispatch) => {
    const anecdote = await anecdoteService.get(id)
    await anecdoteService.put({...anecdote, votes: anecdote.votes+1})
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
)
export default anecdoteReducer