import React from 'react'

export const TodoItem = ({todo,onDelete}) => {
  const myStyle={
    "word-break":"break-all"
  }
  return (
    <div>
      <h4 style={myStyle}>{todo.title}</h4>
      <p style={myStyle}>{todo.desc}</p>
      <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(todo)}}>Delete</button>
    </div>
  )
}
