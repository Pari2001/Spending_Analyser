import React, { useEffect, useState } from 'react'
import Flipcards from './Flipcards'
import '../styles/balance.css'
import Calendar from './Calendar'

const Balance = () => {

    const [openCalendar, setOpenCalendar] = useState(false);
    return (
        <>
            <section className="balance section">
                <h2 className="section__title">Timeline</h2>
                <span className="section__subtitle less__margin__subtitle">Get details of current balance here</span>
                <div className="services__container container grid marginBottom3">
                    <div
                        onClick={() => { setOpenCalendar(true); }}
                        className="button calendar__open__button">
                        Start Date
                    </div>
                    <div
                        onClick={() => { setOpenCalendar(true); }}
                        className="button calendar__open__button">
                        End Date
                    </div>
                </div>
                {
                    openCalendar &&
                    <div className="balance__modal">
                        {/* <div className="services__modal-content">
                            <h4 className="services__modal-title">
                                Choose <br /> Date
                            </h4>
                            <i
                                onClick={() => {
                                    setOpencalendar(false);
                                    console.log('frontend')
                                }}
                                className="uil uil-times services__modal-close"></i>
                        </div> */}
                        {/* <div> */}
                            <div className='modify__calendar__container'>
                                <div className="section__title">Choose Date</div>
                                <div className="flexy">

                                <Calendar />
                                </div>
                                <div className='calendar__button__container'>
                                    <button
                                    onClick={()=>{setOpenCalendar(false);}}
                                    className="button custom__button">Submit</button>
                                    <button
                                    onClick={()=>{setOpenCalendar(false);}}
                                    className="button custom__button">Close</button>
                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                }


                <h2 className="section__title">Balance</h2>
                <span className="section__subtitle less__margin__subtitle">Get details of current balance here</span>
                <div className="services__container container grid marginBottom3">
                    <div>
                        <div className="balance__content">
                            <div className='balance__padding'>
                                <h4>Income</h4>
                                <h3 className=" flexy services__title">Rs<br />20000</h3>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="balance__content">
                            <div className='balance__padding'>
                                <h4>Expense</h4>
                                <h3 className=" flexy services__title">Rs<br />20000</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="section__title">Transactions</h2>
                <span className="section__subtitle">Get details of past transactions here</span>

                {
                    [...Array(10)].map((element, index) => {
                        return (
                            <div className="flexy">
                                <Flipcards id={index} key={index} />
                            </div>

                        )
                    })
                }
            </section>
        </>
    )
}

export default Balance