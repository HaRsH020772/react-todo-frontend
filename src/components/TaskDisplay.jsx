import React, { useEffect, useState } from 'react';
import { getAllTodos, updateATodo, completeTodo } from '../APIConnections/todoAPIS';

function TaskDisplay({ props }) {

  const [executeAsync, setExecuteAsync] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const todoList = async () => {

      try 
      {
        console.log(JSON.parse(localStorage.getItem('todos')) || []);
        const todoData = await getAllTodos(JSON.parse(localStorage.getItem('todos')) || []);

        if(isMounted)
          props.setTodos(todoData);
      } 
      catch (error)
      {
        console.error("Error while fetching the data ", error);
      }
      finally
      {
        if(isMounted)
          setExecuteAsync(false);
      }
      
    };

    if(executeAsync)
      todoList();

    return () => {
      isMounted = false;
    }
// eslint-disable-next-line
  }, [executeAsync]);

  const updateTheTask = async (e, id, title, description) => {

    try
    {
      let todoDetail = {
        taskId: id,
        taskTitle: title,
        taskDescription: description
      };
  
      if(await updateATodo(todoDetail))
      {
        let descriptionTag = e.target.parentElement.previousSibling.lastChild;
        descriptionTag.innerText = description;
  
        let titleTag = e.target.parentElement.previousSibling.previousSibling.lastChild;
        titleTag.innerText = title;
  
        e.target.parentNode.removeChild(e.target.parentNode.lastChild);
      }
    }
    catch(err)
    {
      console.error("Error while updating the task ", err);
    }
  }

  const modifyTheTask = (e, id) => {

    // description
    let descriptionTag = e.target.parentElement.previousSibling;

    let inputTag1 = document.createElement("input");
    inputTag1.value = descriptionTag.lastChild.innerText;
    inputTag1.setAttribute("class", "p-2 w-full")
    descriptionTag.lastChild.innerText = "";

    descriptionTag.lastChild.appendChild(inputTag1);

    // title
    let titleTag = e.target.parentElement.previousSibling.previousSibling.lastChild;

    let inputTag2 = document.createElement("input");
    inputTag2.value = titleTag.innerText;
    titleTag.innerText = "";

    titleTag.appendChild(inputTag2);

    // Adding a complete button
    let btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-primary");
    btn.onclick = () => {updateTheTask(e, id, inputTag2.value, inputTag1.value)};
    btn.innerText = "Update";
    e.target.parentNode.appendChild(btn);
  }

  const completeTask = async (e, id) => {

    try 
    {
      let todoDetail = {
        taskId: id
      };
  
      if(await completeTodo(todoDetail))
      {
        let newTodos = JSON.parse(localStorage.getItem("todos"));
  
        newTodos = newTodos.filter(item => item !== id);
        localStorage.setItem("todos", JSON.stringify(newTodos));
  
        setExecuteAsync(true);
      }
    } 
    catch (err)
    {
      console.error("Error while completing the task ", err);
    }
  }

  return (
    <div className='w-[70%]'>

      <h1 className='text-center capitalize text-3xl font-bold tracking-wider my-5'>Todo List</h1>

      <div className='grid grid-cols-2 gap-4 p-4 px-10 overflow-y-scroll h-[89%]'>

        {props.todos.length > 0 ? props.todos.map((item) => <div key={item._id} className="card bg-neutral h-[15em] text-neutral-content">

          <div className="card-body items-center text-center">

            {item.taskTopic ? <h2 className="card-title"><b>Todo :</b> <span>{item.taskTopic}</span></h2> : ""}

            {item.taskDescription ? <p className='w-full h-[5em] text-left overflow-hidden'><b>Task-description :</b> <span>{item.taskDescription}</span></p> : ""}

            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={(e) => completeTask(e, item._id)}>Complete</button>
              <button className="btn btn-primary" onClick={(e) => modifyTheTask(e, item._id)}>Modify</button>
            </div>

          </div>

        </div>) : <h1 className='my-5 text-xl'>No Task Available</h1>}

      </div>

    </div>
  )
}

export default TaskDisplay;
