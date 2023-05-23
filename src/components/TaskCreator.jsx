import React from 'react';
import { useState } from 'react';
import { getAllTodos, storeTaskAPI } from '../APIConnections/todoAPIS';

function TaskCreator({props})
{
    const [createTask, setCreateTask] = useState({
        taskTitle: "",
        taskDescription: ""
    });

    const handleInput = (e) => {
        setCreateTask({...createTask, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {

        try
        {
            if(createTask.taskTitle < 5 || createTask.taskDescription < 10)
            {
                alert("Please fill the title & Description!!");
                return;
            }
            let result = await storeTaskAPI(createTask);

            if(result.acknowledged)
            {
                let previousTask = JSON.parse(localStorage.getItem("todos"));

                if(!previousTask)
                {
                    previousTask = [result.insertedId];
                    localStorage.setItem('todos', JSON.stringify(previousTask));
                    setCreateTask({
                        taskTitle: "",
                        taskDescription: ""
                    });
                    props.setNewTodo(result.insertedId);
                    props.setTodos(await getAllTodos(JSON.parse(localStorage.getItem("todos"))));
                }
                else
                {
                    previousTask.push(result.insertedId);
                    localStorage.setItem('todos', JSON.stringify(previousTask));
                    setCreateTask({
                        taskTitle: "",
                        taskDescription: ""
                    });
                    props.setNewTodo(result.insertedId);
                    props.setTodos(await getAllTodos(JSON.parse(localStorage.getItem("todos"))));
                }
            }
        
        }
        catch(err)
        {
            console.error("Error while creating the task ", err);
        }
    }

  return (
    <section className='p-5 w-[30%] bg-slate-900 drop-shadow-2xl'>

        <h1 className='capitalize text-3xl font-bold tracking-wider'>Make a todo</h1>

        <div className="form-control mt-10">

        {/* box for the title entry */}
        <label className="input-group">
            <span>Title</span>
            <input type="text" placeholder="enter title for task" onChange={handleInput} name="taskTitle" value={createTask.taskTitle} className="input input-bordered w-full" />
        </label>

        {/* box for task entry */}
        <label className='capitalize mt-5 font-semibold tracking-wide text-lg'>description</label>
        <textarea className="textarea textarea-ghost border mt-3 resize-none h-[10em]" onChange={handleInput} name="taskDescription" value={createTask.taskDescription} placeholder="Click here to write description"></textarea>

        <button className="btn btn-ghost mt-5 tracking-wide" onClick={handleSubmit}>Create</button>

        </div>

    </section>
  )
}

export default TaskCreator;
