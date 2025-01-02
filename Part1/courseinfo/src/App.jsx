const App = () => {
  
  const Header = (props) => {
    console.log(props)
    return (
      <h1>{props.course}</h1>
    )
  }

  const Part = (props) => {
    return (
      <p> {props.topic} {props.exercises} </p>
    )
  }

  const Content = (props) => {
    const parts = props.parts;
    return (
      <div>
        <Part topic={parts[0].topic} exercises={parts[0].exercises} />
        <Part topic={parts[1].topic} exercises={parts[1].exercises} />
        <Part topic={parts[2].topic} exercises={parts[2].exercises} />
      </div>
    )
  }

  const Total = (props) => {
    const parts = props.parts
    return (
      <div>
        <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
      </div>
    )
  }

  const course = 'Half Stack application development'
  const parts = [
    {topic: 'Fundamental of React', exercises: 10},
    {topic: 'Using props to pass data', exercises: 7},
    {topic: 'State of a component', exercises: 14},
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App