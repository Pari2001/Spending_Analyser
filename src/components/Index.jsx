import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Navbar from './Navbar'
import Home from './Home';
import Notebook from './Notebook';
import '../styles/balance.css'
import '../styles/calendar.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login';
import Error from '../error/Error'

const Index = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/notebooks" element={currentUser ? <Notebook /> : <Login />} />
                    <Route exact path="/login" element={<Login />} />
                    {/* <Route exact path="/layout" element={<Layout />} /> */}
                    <Route exact path={`/notebook/:userid/:notebook`} element={currentUser ? <Layout /> : <Login />} />
                    <Route path= '*' element={<Error />} />
                </Routes>
            </Router>
        </>
    )
}

export default Index