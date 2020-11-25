import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notficationReducer'

const AnecdotesList  = (props) => {
  const vote = async (anecdote) => {    
    props.voteAnecdote(anecdote.id)
    props.setNotification(`you voted for '${anecdote.content}'`, 5)
  }
  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const { anecdotes, filter } = state
  return {
    anecdotes: anecdotes.filter(anecdote => (
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    ))
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdotesList)