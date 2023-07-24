import React, { useState } from 'react'
import './TodoApp.css'
import { BrowserRouter,Routes,Route,useNavigate,useParams,Link, Navigate } from 'react-router-dom'
import LogoutComponent from '../todo/LogoutComponent'
import FooterComponent from '../todo/FooterComponent'
import HeaderComponent from '../todo/HeaderComponent'
import ListTodosComponent from '../todo/ListTodosComponent'
import ErrorComponent from '../todo/ErrorComponent'
import LoginComponent from '../todo/LoginComponent'
import WelcomeComponent from '../todo/WelcomeComponent'
import Authprovider, { useAuth } from '../todo/security/AuthContext'
import TodoComponent from './TodoComponent'


/*
    Author: Rajesh Thota
    App : Todo App Front End React
*/

function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children
    return <Navigate to="/"/>
}

export default function TodoApp
() {
  return (
    <div className="TodoApp">
        <Authprovider>
            <BrowserRouter>
                <HeaderComponent/>
                    <Routes>
                    <Route path='/' element={<LoginComponent/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='*' element={
                            <AuthenticatedRoute>
                                <ErrorComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent/>
                            </AuthenticatedRoute>
                        }/>
                    </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </Authprovider>
        
    </div>
  )
}









