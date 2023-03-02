import React from 'react'
import '../styles/error.css'
import piggy from '../images/piggy.svg'
import { Link } from 'react-router-dom'

const Notyou = () => {
    return (
        <>
            <section className="balance section">
                <div className="services__container container grid flexy">
                    <div>
                        <div className="flexy">
                            <img className='error-image' src={piggy} alt="" />
                        </div>
                        <div className="error">
                            Grr!! Grr!! This notebook is not yours
                            <br />
                            Please return pal
                            <br />
                            <Link
                            exact to="/notebooks" 
                            className="button error__buttons">
                                Return 
                                <i className='uil uil-arrow-right'></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Notyou