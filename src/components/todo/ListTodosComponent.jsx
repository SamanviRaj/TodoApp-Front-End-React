import React, { useEffect, useState } from 'react'
import { retrieveTodos,deleteTodoItem } from './api/TodoApiService';
import { Navigate, useNavigate } from 'react-router-dom';


export default function ListTodosComponent(){
    const today = new Date();

    const[todos,setTodos] = useState([]) 
    const[message,setMessage] = useState(null) 

    const navigate = useNavigate()
    useEffect(() => refreshTodosList(),[])

    function refreshTodosList(){
        retrieveTodos()
            .then(response => 
                setTodos(response.data)
            )
            .catch(error  => console.log(error))
    }

    function addNewTodo() {
        navigate(`/todo/-1`)
    }

    function deleteTodo(id){
        console.log("deleted .. "+id)
        deleteTodoItem(id)
            .then(
                () => {
                    setMessage("Todo with id "+id+" deleted Sucessfully")
                    refreshTodosList()
                }
            )
            .catch(error  => console.log(error))
    }

    function updateTodo(id){
        console.log("update clicked .. "+id)
        navigate(`/todo/${id}`)
        // updateTodoItem(id)
        //     .then(
        //         () => 
        //             setMessage("Todo with id "+id+" udated Sucessfully"),
        //             refreshTodosList()
                
        //     )
        // .catch(error  => console.log(error))
    }

    return(
        <div className="container">
            <h1>Things you want to Do !!</h1>
            {message && <div className="alert alert-warning time">{message}</div>}
            <div>
                <table className="table" key={todos.id}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Description</th>
                            <th>Is done ?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                         <td>{todo.id}</td>
                                         <td>{todo.description}</td>
                                         <td>{todo.isDone}</td>
                                         <td>{todo.targetDate.toString()}</td>
                                         <td><button className="btn-active" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                         <td><button className="btn-active" onClick={() => updateTodo(todo.id)}>Update</button></td>   
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <div>
                    <div className="btn btn-success m-3" onClick={addNewTodo}>Add New Todo !!</div>
                </div>
            </div>
        </div>
    )
}
