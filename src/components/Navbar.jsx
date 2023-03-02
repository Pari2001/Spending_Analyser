import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { NavLink, Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { auth } from '../firebase.config'
import { signOut } from "firebase/auth";
import '../styles/navbar.css'

const Navbar = () => {
    
    const { currentUser } = useContext(AuthContext)
    
    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    
    // const themeButton = document.getElementById('theme-button')
    const darkTheme = 'dark-theme'

    const themeChange = () => {
        document.body.classList.toggle(darkTheme)
        // console.log(document.querySelector('.change-theme'))
        document.querySelector('.change-theme').classList.toggle('uil-moon')
        document.querySelector('.change-theme').classList.toggle('uil-sun')
    }

    /*==================== REMOVE MENU MOBILE ====================*/
    const linkAction = () => {
        const navMenu = document.getElementById('nav-menu')
        // console.log(navMenu, 'clicked')
        navMenu.classList.remove('show-menu')
    }

    return (
        <header className="header" id="header">
            <nav className="nav container">
                <Link to='/' className="nav__logo flexy">
                    <img className='nav__logo-img' src={logo} alt="" />
                    Spending Analyser
                </Link>
                <div className="nav__menu" id="nav-menu">
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <NavLink
                                onClick={() => { linkAction(); }}
                                activeclassname="active"
                                exact
                                to="/"
                                className="nav__link">
                                <i class="uil uil-estate nav__icon"></i>Home
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                onClick={() => { linkAction(); }}
                                activeclassname="active"
                                exact
                                to="/notebooks"
                                className="nav__link">
                                <i class="uil uil-notes nav__icon"></i>Notebooks
                            </NavLink>
                        </li>

                        {
                            currentUser === null ?

                                <li className="nav__item">
                                    <NavLink
                                        onClick={() => { linkAction(); }}
                                        activeClass="active"
                                        exact
                                        to="/login"
                                        className="nav__link">
                                        <i class="uil uil-sign-in-alt nav__icon"></i>Login
                                    </NavLink>
                                </li>
                                :

                                <li className="nav__item">
                                    <span
                                        onClick={() => { 
                                            linkAction();
                                            logout();
                                        }}
                                        className="nav__link">
                                        <i class="uil uil-sign-out-alt nav__icon"></i>Logout
                                    </span>
                                </li>
                        }

                    </ul>

                    <i
                        onClick={() => {
                            document.getElementById('nav-menu').classList.remove('show-menu')
                        }}
                        className="uil uil-times nav__close" id="nav-close"></i>
                </div>
                <div className="nav__btns">
                    <i
                        onClick={() => { themeChange(); }}
                        className="uil uil-sun change-theme" id="theme-button"></i>
                    <div
                        onClick={() => {
                            document.getElementById('nav-menu').classList.add('show-menu')
                        }}
                        className="nav__toggle" id="nav-toggle">
                        <i className="uil uil-apps"></i>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar