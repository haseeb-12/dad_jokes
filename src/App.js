import React from "react";
import './App.css'
import ToDoList from "./component/ToDoList";
import { useToDos } from "./context/Context";
import Modal from "./modal/Modal";



const App = () => {
  const { dispatch, state: { show } } = useToDos()
  return (

    <div className="app" >
      {show && <Modal />}
      <h1>TO DO LIST</h1>
      <div className="todo_btn">
        <button onClick={() => dispatch({
          type: 'SHOW'
        })}>Add Task</button>
        <select onChange={(e) => dispatch({
          type: 'SELECT',
          payload: e.target.value
        }
        )}>
          <option value='All'>All</option>
          <option value='Incomplete'>Incomplete</option>
          <option value='Complete'>Complete</option>
        </select>
      </div>
      <ToDoList />
    </div>
  )
}

export default App