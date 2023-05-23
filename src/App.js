import './App.css';
import TaskCreator from './components/TaskCreator';
import TaskDisplay from './components/TaskDisplay';
import { useState } from 'react';

function App() 
{
  // Helps to change the todos when you create a new todo
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div className="flex h-[100vh]">

      <TaskCreator props={{setNewTodo, newTodo, todos, setTodos}} />
      <TaskDisplay props={{setNewTodo, newTodo, todos, setTodos}} />

    </div>
  );
}

export default App;
