import axios from "axios";

const apiClient = axios.create(
        {
                baseURL:`http://localhost:9011`
        }
)

export const retrieveTodos 
        = () => apiClient.get("/api/v1/todo",{
                headers: {
                        Authorization : 'Basic cmFqZXNoOjEyMzQ1'
                }
        })

export const retrieveTodosById 
        = (id) => apiClient.get(`/api/v1/todo/get/${id}`,{
                headers: {
                        Authorization : 'Basic cmFqZXNoOjEyMzQ1'
                }
        })
        // /api/v1/todo/get/{id}

export const updateTodoApi
        = (todo) => apiClient.put("/api/v1/todo/update",todo,{
                headers: {
                        Authorization : 'Basic cmFqZXNoOjEyMzQ1'
                }
        })

export const deleteTodoItem
        = (id) => apiClient.delete(`/api/v1/todo/delete/${id}`,{
                headers: {
                        Authorization : 'Basic cmFqZXNoOjEyMzQ1'
                }
        })
        // /api/v1/todo/delete/203

export const ceateTodoApi 
        = (todo) => apiClient.post("/api/v1/todo/create",todo,{
                headers: {
                        Authorization : 'Basic cmFqZXNoOjEyMzQ1'
                }
        })
