import React, { useState } from 'react'
import { BrowserRouter,Routes,Route,useNavigate,useParams,Link } from 'react-router-dom'
import { useAuth } from './security/AuthContext'

export default function LoginComponent(){

    const [username,setUsername] = useState('rajesh')
    const [password,setPassword] = useState('')
    
    const [showErrorMessage,setShowErrorMessage] = useState(false)
    
    const navigate = useNavigate()

    const authContext = useAuth()    

    function handleUserNameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {  
        setPassword(event.target.value)
    }

    function handleSubmit(event) {
        console.log(username);
        console.log(password);
        if(authContext.login(username,password)){
            navigate(`/welcome/${username}`)
        }else{
            setShowErrorMessage(true)
            console.log('failure')
        }
    }

    return(
        <div>
            <div className="Login">
                <h1> Time to Login !!</h1>
                {showErrorMessage && <div className="errorMessage">Authentication failed</div>}
                <div className="LoginForm">
                    <div className=''>
                        <label> User Name </label>
                        <input type="text" name="username" value={username} onChange={handleUserNameChange}/>
                    </div>
                    <div className=''>
                        <label> Password </label>
                        <input type="password" name="password" onChange={handlePasswordChange}/>
                    </div>
                    <div>
                        <button type="button" name="login" onClick={handleSubmit} >Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
