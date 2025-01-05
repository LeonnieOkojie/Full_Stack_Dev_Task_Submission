import { useState } from 'react'

// defined the Statistics component that will display the feedback statistics
const Statistics = ({ good, neutral, bad, all }) => {

  // if no feedback has been given, display a message
  if (all === 0) {
    // console.log added to test the condition
    console.log('no feedback given', all)
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given </p>
      </div>
    )
  }

  // defined the statisticLine component that will display the feedback statistics
  const StatisticLine = ({ text, value }) => {
    return (
      <>
        <td>{text}</td> 
        <td>{value}</td>
      </>
    )
  }

  // else display the feedback statistics
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr><StatisticLine text='good' value={good}/></tr>
        
          <tr><StatisticLine text= 'neutral' value={neutral}/></tr>
          
          <tr><StatisticLine text = 'bad' value={bad} /></tr>
          
          <tr><StatisticLine text= 'all' value={all} /></tr>

          <tr><StatisticLine text= 'average' value={all === 0 ? 0: ((good - bad) / all).toFixed(1)} /></tr>

          <tr><StatisticLine text= 'positive' value={all === 0 ? '0%': `${((good / all) * 100).toFixed(1)} %`} /></tr>
        </tbody>
      </table>
    </div>
  )
}

// define Button component that will handle the click event
const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} >{text}</button>
  )
}



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodFeedback = () => {
    //console.log used for debugging purposes
    console.log('good before', good)
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log('good after', updatedGood)
    setAll(updatedGood + neutral + bad)
  }

  const handleNeutralFeedback = () => {
    // console.log used for debugging purposes
    console.log('neutral before', neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    console.log('neutral after', updatedNeutral)
    setAll(good + updatedNeutral)
  }

  const handleBadFeedback = () => {
    // console.log used for debugging purposes
    console.log('bad before', bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
    console.log('bad after', updatedBad)
    setAll(good + neutral + updatedBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodFeedback} text='good'/>
      <Button onClick={handleNeutralFeedback} text='neutral'/>
      <Button onClick={handleBadFeedback} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App