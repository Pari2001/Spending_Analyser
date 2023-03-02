import React, { useState } from 'react'
import '../styles/layout.css'

const Flipcards = (props) => {
    
    const [spin, setSpin] = useState(false);

    const handleClick = (event) => {
        if(event.target.classList.contains('delete__button')){
            props.deleteTransaction(props.index);
        }
        else{
            setSpin(!spin);
        }
    }

    return (
        <>
            <div className="balance__transaction__content poke">
                <div onClick={handleClick} 
                className={`transaction__card flexy sp-card ${spin ? "voltorb" : ""}`}>
                    <div className="main__card front">
                        <div className='transaction__ transaction__top'>
                            <i className="uil uil-trash-alt delete__button"></i>
                            <div className="category-style flexy py-1 px-2">
                                <div className={`pokemon-tag mx-2`}></div>
                                <div>{props.element.category.charAt(0).toUpperCase() + props.element.category.slice(1)}</div>
                            </div>
                        </div>
                        <div className='transaction__ transaction__back'>
                            <span>{props.element.reason.charAt(0).toUpperCase() + props.element.reason.slice(1)}</span>
                            <span>₹ {props.element.amount}</span>
                        </div>
                    </div>
                    <div className="main__card back">
                        {props.element.description.charAt(0).toUpperCase() + props.element.description.slice(1)}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Flipcards