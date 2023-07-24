import { BrowserRouter,Routes,Route,useNavigate,useParams,Link } from 'react-router-dom'
import {AuthContext, useAuth} from './security/AuthContext'
import { useContext } from 'react'


export default function HeaderComponent(){
    
    // const authContext = useContext(AuthContext)
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function logout(){
        authContext.logout()
    }

    // console.log(authContext)

    return(
        <div className="header">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">NXD</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                {isAuthenticated && <Link className="nav-link" to="/welcome/Rajesh">Home</Link>}
                            </li>
                            <li className="nav-item">
                                {isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}
                            </li>
                            <li className="nav-item">
                                {isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                            </li>
                            <li className="nav-item">
                                {!isAuthenticated && <Link className="nav-link" to="/login">login</Link>}
                            </li>
                            <li className="nav-item">
                                {isAuthenticated && <a className="nav-link" href="www.google.com">Google</a>}
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}