import { createContext, useContext } from "react";
import React from 'react'
import { useReducer } from "react";
import { useEffect } from "react";

const initialState = {
  toDoItems: JSON.parse(localStorage.getItem('data')) || [],
  show: false,
  select: 'All',
  editId: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        toDoItems: [...state.toDoItems, action.payload]
      };
    case 'SHOW':
      return {
        ...state,
        show: !state.show
      };
    case 'DELETE':
      return {
        ...state,
        toDoItems: state.toDoItems.filter(todos => todos.id !== action.payload)
      };
    case 'SELECT':
      return {
        ...state,
        select: action.payload
      };
    case 'EDIT':
      return {
        ...state,
        show: true,
        editId: action.payload
      };
    case "UPDATE":
      return {
        ...state,
        toDoItems: state.toDoItems.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
        editId: ''
      };
    case "CHECK":
      return {
        ...state,
        toDoItems: state.toDoItems.map(item => {
          if (item.isCompleted !== action.payload) {
            return {
              ...item,
              status: "Complete"
            };
          }
          return item;
        })
      };
    default:
      return state;
  }
};

export const ContextPr = createContext();

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(state.toDoItems));
  }, [state.toDoItems]);

  return (
    <ContextPr.Provider value={{ state, dispatch }}>
      {children}
    </ContextPr.Provider>
  );
};

export const useToDos = () => {
  return useContext(ContextPr);
};
