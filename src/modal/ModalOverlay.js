import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useToDos } from "../context/Context";

const ModalOverlay = () => {
  const { dispatch, state: { editId, toDoItems } } = useToDos();
  const [formData, setFormData] = useState({ toDoItem: "", status: "Incomplete" });

  useEffect(() => {
    if (editId) {
      const itemToEdit = toDoItems.find(item => item.id === editId);
      setFormData({ ...itemToEdit });
    } else {
      setFormData({ toDoItem: "", status: "Incomplete" });
    }
  }, [editId, toDoItems]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      ...formData,
      id: editId ? editId : uuidv4(),
      isCompleted: false,
      time: new Date().toLocaleString()
    };
     
    if(payload.toDoItem){
      dispatch({
        type: editId ? "UPDATE" : "ADD_DATA",
        payload
      });
    }
  

    setFormData({ toDoItem: "", status: "Incomplete" });
  };

  return (
    <div className="form_toDo">
      <form onSubmit={handleSubmit}>
        <h1>ADD TO DO</h1>
        <label>Title</label>
        <input
          type="text"
          name="toDoItem"
          value={formData.toDoItem}
          onChange={handleChange}
        />
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Incomplete</option>
          <option>Complete</option>
        </select>
        <button className="blue">{editId ? "Update" : "Add Task"}</button>
        <button onClick={() => dispatch({ type: "SHOW" })}>Cancel</button>
      </form>
      <button onClick={() => dispatch({ type: "SHOW" })} className="top">
        X
      </button>
    </div>
  );
};

export default ModalOverlay;
