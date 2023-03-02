import React from 'react'
import piggy from '../images/piggy.svg'
import '../styles/home.css'

const Home = () => {
    return (
        <>
            <section className="section home__section">
                <div className="container style__home grid home__container">
                    <div className='flexy home_container_dialogue'>
                        Money moves from those who don't manage it to those who do;
                    </div>
                    <div className="flexy">
                        <img src={piggy} className='oscillate' alt="" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home