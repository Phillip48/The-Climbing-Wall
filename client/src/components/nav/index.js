import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaInfoCircle, FaCheckCircle } from 'react-icons/fa'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../nav/style.css'
import ClimbingLogo from '../../assets/logo/The Climbing Wall-logos_transparent.png';

import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

const Nav = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <>
            <header className="hold-everything-navbar">
                <section className="header-section">
                    <div className="holds-climbinglogo">
                        <a href="/"><img className="climbinglogo" src={ClimbingLogo} alt='logo'></img></a>
                    </div>
                    {user ? (
                        <div className="holds-page-options">
                            <Link to='/info'><button className="navbar-button"><FaInfoCircle />Info</button></Link>
                            <div className="div-padding-verysmall"></div>
                            <Link to='/logforms'><button className="navbar-button"><FaCheckCircle />Log</button></Link>
                            <div className="div-padding-verysmall"></div>
                            {/* <Link to='/logs'><button className="navbar-button">Logs</button></Link> */}
                            <button className="navbar-button" onClick={onLogout}><FaSignOutAlt /> LogOut</button>
                        </div>
                    ) : (
                        <div className="holds-page-options">
                            <Link to='/info'><button className="navbar-button"><FaInfoCircle />Info</button></Link>
                            <div className="div-padding-verysmall"></div>
                            <Link to='/signup'><button className="navbar-button"><FaUser />Register</button></Link>
                            <div className="div-padding-verysmall"></div>
                            <Link to='/login'><button className="navbar-button"><FaSignInAlt /> Log In</button></Link>
                        </div>
                    )}
                </section>
            </header>
            {/* <section className="nav-undernav-holds-banner">
                <div className="nav-undernav-banner">
                    <p className="undernav-text"><b>The Climbing Wall</b> is free to use for all ages. Track your progress and see how you have improved while climbing!</p>
                </div>
            </section> */}
        </>
    )
}

export default Nav;