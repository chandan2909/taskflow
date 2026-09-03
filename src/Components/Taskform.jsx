import React, { useState } from "react";

export default function Transform( { addTask} ) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState("Medium");
  const [ category, setCategory ] = useState( "General" );
  
  const handleSumbit = (e) => {
    e.preventDefault();
    addTask( { text: task, priority, category, completed: false } )
    setTask( " " )
    setPriority( "Medium" )
    setCategory("General")
  };

 

  
  return (
    <form
      onSubmit={handleSumbit}
      className="task-form"
    >
      <br></br>
      <div id="input">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <span>
          <button type="submit">Add Task</button>
        </span>
        <h2>
          {task} {priority} {category}
        </h2>
      </div>
      <div id="btns">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work </option>
        </select>
      </div>
    </form>
  );
}
