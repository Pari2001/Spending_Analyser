import React, { useState, useEffect } from 'react'
import '../styles/add.css'
import { db } from "../firebase.config";
import { auth } from '../firebase.config';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";

const Add = (props) => {

    const uid = props.uid;
    const notebook = props.notebook;
    // const [notebook, setNotebook] = useState([]);

    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("");
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [reasonError, setReasonError] = useState(false);
    const [amountError, setAmountError] = useState(false);

    function isNumeric(str) {
        return /^\d+(\.\d{1,2})?$/.test(str);
    }

    const addTransaction = (event) => {

        event.preventDefault();

        if (category === "") {
            setError(true);
            return;
        }

        if (!isNumeric(amount.trim())) {
            setAmountError(true);
            return;
        }

        if (reason.trim() === "") {
            setReasonError(true);
            return;
        }

        let setup = notebook;
        let arr = notebook.transactions;

        const date = new Date();
        const form = {
            category: category,
            reason: reason.trim(),
            amount: amount.trim(),
            description: description.trim(),
            fulldate: date,
            // day: date.getDay(),
            // date: date.getDate(),
            // month: date.getMonth(),
            // year: date.getFullYear()
        }
        arr.unshift(form);
        setup.transactions = arr;
        setDoc(doc(db, `users/${uid}/notebooks`, `${notebook.name}`), setup);

        setCategory("");
        setAmount("");
        setReason("");
        setDescription("");
    }

    return (
        <>
            {
                error &&
                <div className="services__modal">
                    <div className="services__modal-content login__error__modal-content">
                        <h4 className="services__modal-title">Lechonk <br /> Guidelines</h4>
                        <i
                            onClick={() => {
                                setError(false);
                            }}
                            className="uil uil-times services__modal-close">
                        </i>
                        <div>
                            Please select a realtive category according to the transaction.
                        </div>
                    </div>
                </div>
            }

            {
                reasonError &&
                <div className="services__modal">
                    <div className="services__modal-content login__error__modal-content">
                        <h4 className="services__modal-title">Lechonk <br /> Guidelines</h4>
                        <i
                            onClick={() => {
                                setReasonError(false);
                            }}
                            className="uil uil-times services__modal-close">
                        </i>
                        <div>
                            Please type the reason properly
                        </div>
                    </div>
                </div>
            }

            {
                amountError &&
                <div className="services__modal">
                    <div className="services__modal-content login__error__modal-content">
                        <h4 className="services__modal-title">Lechonk <br /> Guidelines</h4>
                        <i
                            onClick={() => {
                                setAmountError(false);
                                setAmount("");
                            }}
                            className="uil uil-times services__modal-close">
                        </i>
                        <div>
                            Please enter only numbers in the amount field.
                        </div>
                    </div>
                </div>
            }



            <h2 className="section__title">Add Transactions</h2>
            <span className="section__subtitle less__margin__subtitle">FIll details to add transactions</span>

            <div className="services__container add__container grid grid1 container marginBottom3">
                <div className='add__form'>
                    <form
                        onSubmit={addTransaction}
                        className="services__form">
                        <div class="dropdown mb1_5">
                            <div
                                onClick={() => { setShow(!show); }}
                                class={`dropdown-toggle ${show ? "dropdown-open" : "dropdown-close"} flex_space_between`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className='flexy'>
                                    {category === "" ? "Dropdown Button" : `${category}`}
                                </span>

                                <i className={`uil uil-angle-down dropdown__arrow`}>
                                </i>
                            </div>

                            {/* {
                                    show &&  */}
                            <ul className={`dropdown-menu ${!show ? 'hide-menu' : ''} rounded`} aria-labelledby="dropdownMenuButton1">{
                                (notebook !== undefined ?
                                    notebook.categories.map((individualCategory, index) => {
                                        return (
                                            <li className="dropdown-item category_options" onClick={() => { setCategory(individualCategory); setShow(false); }}>{individualCategory}</li>
                                        )
                                    })
                                    :
                                    <></>
                                )
                            }
                            </ul>
                            {/* } */}
                        </div>
                        <div class="services__form-content mb1_5">
                            <label for="" className="services__label">Amount</label>
                            <input
                                required
                                value={amount}
                                onChange={(event) => { setAmount(event.target.value) }}
                                type="text" className="services__input" />
                        </div>

                        <div className='services__form-content mb1_5'>
                            <label for="" className="services__label">Crisp Reason</label>
                            <input
                                required
                                value={reason}
                                onChange={((event) => { setReason(event.target.value) })}
                                className='services__input' type="text" />
                        </div>
                        <div className='services__form-content mb1_5'>
                            <label for="" className="services__label">Description</label>
                            <input
                                value={description}
                                onChange={((event) => { setDescription(event.target.value) })}
                                className='services__input' type="text" />
                        </div>
                        <button className="flexy notebook__submit button w100">Submit</button>
                    </form>


                </div>
            </div>
        </>
    )
}

export default Add