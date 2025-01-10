import React from "react"

const Course = ( {courses} ) => {
    return (
      <div>
        {courses.map((course) => 
          <div key={course.id}>
            <h1>Web development curriculum</h1>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
          </div>
        )}
      </div>
    )
}

const Header = ({ course }) => <h2>{course.name}</h2>
  

const Part = ({ part }) => 
<p>
  {part.name} {part.exercises}
</p>

const Content = ({ parts }) => 
  <>
    {parts.map((part) => 
    <Part key={part.id} part={part}/>
    )}
  </>

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <p>
            <strong>total of {total} exercises </strong>
        </p>
    )
}


export default Course