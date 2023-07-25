import React, { useEffect , useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { retrieveTodosById,updateTodoApi,ceateTodoApi } from './api/TodoApiService';
import { AuthContext, useAuth } from './security/AuthContext';
import { Formik,Form, Field, ErrorMessage } from 'formik';
import moment from 'moment/moment';

export default function TodoComponent() {

    const {id} = useParams()

    const[todoid,setTodoID] = useState('');
    const[description,setDescription] = useState('')
    const[targetDate,setTargetDate] = useState('') 

    const navigate = useNavigate()
    const format2 = "YYYY-MM-DD"
    const format1 = "MM-DD-YYYY"

    const authContext = useAuth()
    const username = authContext.username   
    
    useEffect(
        () => retrieveTodosDetails,[id]
    )

    function retrieveTodosDetails(){
        if(id != -1){
            retrieveTodosById(id)
            .then(response => {
                setTodoID(response.data.todoid)
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
                })
            .catch(error  => console.log(error))
        }
    }

    function onSubmit(values) {
        console.log(values)
        console.log(values.targetDate)
      
        if(id == -1){
            const todo = {
                id:id,
                description:values.description,
                targetDate: moment(values.targetDate).format(format1),
                done:false
            }
            ceateTodoApi(todo)
            .then(response => {
                console.log(response)
                navigate('/todos')

            })
            .catch(error  => console.log(error))
        }else{
            const todo = {
                id:id,
                description:values.description,
                targetDate: moment(values.targetDate).format(format2),
                done:false
            }
            updateTodoApi(todo)
                .then(response => {
                    console.log(response)
                    navigate('/todos')

                })
            .catch(error  => console.log(error))
        }
    }

    function validate(values) {
        let errors = {
            // description : 'Enter a valid description',
            // targetDate : 'Enter a valid targetDate'
        }
        if(values.description.length < 5){
            errors.description = "Enter atlest 5 charcter for description !!"
        }
        if(values.description.targetDate == null && values.description.targetDate == ''){
            errors.description = "Enter value for targetDate !!"
        }
        console.log(values)
        return errors
    }

  return (
    <div className="container">
        <h1> Enter Todo Details !!</h1>
        <div>
            <Formik initialValues={{ description,targetDate}}
                enableReinitialize = {true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />
                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>TargetDate</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }   
            </Formik>
        </div>
    </div>
  )
}
