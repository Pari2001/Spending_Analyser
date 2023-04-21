import React, { useState, useEffect } from 'react'
import '../styles/login.css'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import {
    collection,
    onSnapshot,
    doc,
    setDoc,
} from "firebase/firestore";

const Login = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [email2, setEmail2] = useState("");
    const [password2, setPassword2] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [userlist, setUserlist] = useState([]);

    const navigate = useNavigate();

    const signup = (event) => {

        event.preventDefault();

        createUserWithEmailAndPassword(auth, email.trim(), password.trim())
            .then((result) => {
                // Signed in 
                const user = result.user;
                // updateProfile(result.user, {
                //     displayName: username,
                // });

                setDoc(doc(db, "users", result.user.uid), {
                    uid: result.user.uid,
                    email,
                    notebooks: [],
                    bills: [],
                    cards: [],
                });

                navigate("/");
                // ...
            })
            .catch((error) => {
                setError(true);
                setPassword("");
                setEmail("");
                setErrorMessage(error.message);
                return;
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    }

    const signin = (event) => {

        event.preventDefault();
        signInWithEmailAndPassword(auth, email2, password2)
            .then((result) => {
                // Signed in 
                const user = result.user;
                navigate("/notebooks");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(error.message)
                setError(true);
                setEmail2("");
                setPassword2("");
                return;
            });
    }

    return (
        <>
            <section className="section login__page flexy">

                {
                    error &&
                    <div className="services__modal">
                        <div className="services__modal-content danger__modal login__error__modal-content">
                            <h4 className="services__modal-title">Spending <br /> Analyser</h4>
                            <i
                                onClick={() => {
                                    setError(false);
                                }}
                                className="uil uil-times services__modal-close danger__close">
                            </i>
                            <div className='error__message-login'>
                            {errorMessage}
                                {/* Some error has occured, please retry. */}
                            </div>
                        </div>
                    </div>
                }


                <div className="login__main">
                    <input
                        onClick={() => {
                            setEmail("");
                            setEmail2("");
                            setPassword("");
                            setPassword2("");
                        }}
                        type="checkbox" id="chk" aria-hidden="true" />
                    <div className="signup">
                        <form
                            onSubmit={signup}

                            className='services__form'>
                            <label className='login__label' htmlFor="chk" aria-hidden="true">Sign Up</label>
                            {/* <div className="flexy">
                                <input
                                    value={username}
                                    onChange={(event) => { setUsername(event.target.value); }}
                                    className='login__input' type="text" name="txt" placeholder='username' required="" />
                            </div> */}
                            <div className="flexy">
                                <input
                                    value={email}
                                    onChange={(event) => { setEmail(event.target.value); }}
                                    className='login__input' type="email" name="email" placeholder='email' required="" />
                            </div>
                            <div className="flexy">
                                <input
                                    value={password}
                                    onChange={(event) => { setPassword(event.target.value); }}
                                    className='login__input' type="password" name="pswd" placeholder='password' required="" />
                            </div>
                            <button
                                className='login__button flexy'>Sign Up</button>
                        </form>
                    </div>
                    <div className="login">
                        <form onSubmit={signin}
                            className='services__form'>
                            <label className='login__label' htmlFor="chk" aria-hidden="true">Login</label>
                            <div className="flexy">
                                <input
                                    value={email2}
                                    onChange={(event) => { setEmail2(event.target.value); }}
                                    className='login__input' type="email" name="email" placeholder='email' required="" />
                            </div>
                            <div className="flexy">
                                <input
                                    value={password2}
                                    onChange={(event) => { setPassword2(event.target.value); }}
                                    className='login__input' type="password" name="pswd" placeholder='password' required="" />
                            </div>
                            <button className='login__button flexy'>Login</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
