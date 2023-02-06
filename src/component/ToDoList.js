import React, { useMemo } from 'react'
import { MdDelete } from 'react-icons/md'
import { BiEditAlt } from 'react-icons/bi'
import './todo.css';
import { useToDos } from '../context/Context';

const ToDoList = () => {
  const { dispatch, state } = useToDos();
  const { toDoItems, select } = state;

  const filterData = useMemo(() => {
    return select === 'All'
      ? [...toDoItems]
      : toDoItems.filter(t => t.status === select);
  }, [select, toDoItems]);

  return (
    <div className="todo">
      {filterData.length === 0 && <h3>No Todos</h3>}
      {filterData.map(({ id, time, toDoItem }) => (
        <div className="list" key={id}>
          <div className="left_side">
            <input type="checkbox" onChange={e => {
              dispatch({ type: 'CHECK', payload: e.target.checked });
            }} />
            <div>
              <h4>{toDoItem}</h4>
              <p>{time}</p>
            </div>
          </div>
          <div className="right_side">
            <MdDelete
              style={{ color: 'red' }}
              className="icons"
              onClick={() =>
                dispatch({ type: 'DELETE', payload: id })
              }
            />
            <BiEditAlt
              className="icons"
              onClick={() =>
                dispatch({ type: 'EDIT', payload: id })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
