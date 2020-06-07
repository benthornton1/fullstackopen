import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, value, symbol}) => {
  return (
      <tr>
        <td>{text}</td> 
        <td>{value} {symbol}</td>
      </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good !== 0 || neutral !== 0 || bad !== 0){
    return (
      <div>
        <table>
          <Statistic text='good' value={good}/>
          <Statistic text='neutral' value={neutral}/>
          <Statistic text='bad' value={bad}/>
          <Statistic text='all' value={good+neutral+bad}/>
          <Statistic text='average' value={(good-bad)/(good+neutral+bad)}/>
          <Statistic text='positive' value={(good/(good+neutral+bad))*100} symbol='%'/>
        </table>
      </div>
    )
  }
  return (
    <div>No feedback given</div>
    )
    
  }
  const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    const handleGoodClick = () => {
      setGood(good + 1)
    }
    const handleNeutralClick = () => {
      setNeutral(neutral + 1)
    }
    const handleBadClick = () => {
      setBad(bad + 1)
    }
    return (
      <div>
      <h3>Give Feedback</h3>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='good'/>
      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)