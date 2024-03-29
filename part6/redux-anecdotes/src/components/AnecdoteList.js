import { useSelector, useDispatch } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, handleClick}) => {
    return (
        <div>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes} votes
            <button onClick={handleClick}>Vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
  
    return (
        <div>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote => 
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote} 
                        handleClick={() => 
                            dispatch(voteFor(anecdote.id))
                        } 
                    />
                )
            }
        </div>
    )
}

export default AnecdoteList