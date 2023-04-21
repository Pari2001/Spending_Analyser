import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import Calendar from './Calendar';
import Manage from './Manage';
import Add from './Add';
import '../styles/layout.css';
import { db } from "../firebase.config";
import Nonotebook from '../error/Nonotebook';
import Flipcards from './Flipcards';
import Notyou from '../error/Notyou';
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
    FieldValue
} from "firebase/firestore";


const NewBalance = () => {

    //  auth 
    const { currentUser } = useContext(AuthContext);

    //  params
    const parameter = useParams();
    const userid = parameter.userid;
    const notebookName = parameter.notebook;

    //  passing props
    const [notebook, setNotebook] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [total, setTotal] = useState(0);

    //  category
    const [changeCategoryArr, setChangeCategoryArr] = useState([]);
    const [defaultCategory, setDefaultCategory] = useState([]);

    //  segments
    const [openStartCalendar, setOpenStartCalendar] = useState(false);
    const [openEndCalendar, setOpenEndCalendar] = useState(false);

    const [user, setUser] = useState([]);

    const [balance, setBalance] = useState(true);
    const [transactionTab, setTransactionTab] = useState(false);
    const [manage, setManage] = useState(false);
    const [add, setAdd] = useState(false);


    const [openModal, setOpenModal] = useState(false);
    const [income, setIncome] = useState(0);
    const [incomeValueError, setIncomeValueError] = useState(false);
    const [incomeInput, setIncomeInput] = useState('');


    const defaultStart = new Date(1950, 0, 1, 0, 0, 0, 0);
    const defaultEnd = new Date(2050, 11, 31, 23, 59, 59, 999);
    const [startDate, setStartDate] = useState(defaultStart);
    const [endDate, setEndDate] = useState(defaultEnd);
    const [startChoosen, setStartChoosen] = useState(false);
    const [endChoosen, setEndChoosen] = useState(false);

    const notebooksCollectionRef = collection(db, `users/${currentUser.uid}/notebooks`);

    useEffect(() => {

        onSnapshot(notebooksCollectionRef, (snapshot) => {
            const notebooks = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })

            const result = notebooks.filter((element, index) => {
                return (element.name === notebookName);
            })

            setNotebook(result)
            if (result.length > 0) {

                setTransaction(
                    result[0].transactions.filter((pay, index) => {
                        return ((!changeCategoryArr.includes(pay.category)) && ((new Date(pay.fulldate.seconds * 1000)) >= startDate && (new Date(pay.fulldate.seconds * 1000)) <= endDate))
                    })
                )

                const arr = new Array(1).fill(0);
                result[0].transactions.forEach((pay) => {
                    if ((!changeCategoryArr.includes(pay.category)) && ((new Date(pay.fulldate.seconds * 1000)) >= startDate && (new Date(pay.fulldate.seconds * 1000)) <= endDate)) {
                        arr[0] += parseInt(pay.amount);
                    }
                })
                setTotal(arr[0])


                const incomearr = new Array(1).fill(0);
                result[0].income.forEach((pay) => {
                    if (((new Date(pay.fulldate.seconds * 1000)) >= startDate && (new Date(pay.fulldate.seconds * 1000)) <= endDate)) {
                        incomearr[0] += parseInt(pay.amount);
                    }
                })
                console.log(incomearr[0]);
                setIncome(incomearr[0])

            }
        });

    }, [currentUser]);

    useEffect(() => {
        if (notebook.length > 0) {
            setTransaction(
                notebook[0].transactions.filter((pay, index) => {
                    return ((!changeCategoryArr.includes(pay.category)) && ((new Date(pay.fulldate.seconds * 1000)) >= startDate && (new Date(pay.fulldate.seconds * 1000)) <= endDate))
                })
            )

            const arr = new Array(1).fill(0);
            notebook[0].transactions.forEach((pay) => {
                if ((!changeCategoryArr.includes(pay.category)) && ((new Date(pay.fulldate.seconds * 1000)) >= startDate && (new Date(pay.fulldate.seconds * 1000)) <= endDate)) {
                    arr[0] += parseInt(pay.amount);
                }
            })
            setTotal(arr[0])

            const incomearr = new Array(1).fill(0);
            notebook[0].income.forEach((pay) => {
                if (((new Date(pay.fulldate.seconds * 1000)) >= startDate && (new Date(pay.fulldate.seconds * 1000)) <= endDate)) {
                    incomearr[0] += parseInt(pay.amount);
                }
            })
            setIncome(incomearr[0])

        }
    }, [startDate, endDate])

    const toggleArr = (arr, category) => {
        var idx = arr.indexOf(category);
        console.log(idx)
        if (idx >= 0) {
            arr.splice(idx, 1);
        } else {
            arr.push(category);
        }
        return arr;
    }

    const toggleCategory = (category) => {
        const arr = changeCategoryArr;
        const ansArr = toggleArr(arr, category);
        setChangeCategoryArr(ansArr)
        setTransaction(
            notebook[0].transactions.filter((pay, index) => {
                return ((!ansArr.includes(pay.category)) && ((new Date(pay.fulldate.seconds * 1000)) >= startDate && (new Date(pay.fulldate.seconds * 1000)) <= endDate))
            })
        )
        const totalArr = new Array(1).fill(0);
        notebook[0].transactions.forEach((pay) => {
            if ((!ansArr.includes(pay.category)) && ((new Date(pay.fulldate.seconds * 1000)) >= startDate && (new Date(pay.fulldate.seconds * 1000)) <= endDate)) {
                totalArr[0] += parseInt(pay.amount);
            }
        })
        setTotal(totalArr[0])
    }

    function isNumeric(str) {

        if (typeof(str) == 'number') {
            str = str.toString();
        }
          
        // Check if input is empty
        if (str.trim() === '') {
            return false;
        }

        return /^\d+(\.\d{1,2})?$/.test(str);
    }

    const addIncome = () => {

        if(!isNumeric(incomeInput)){
            setIncomeValueError(true);
            return ;
        }

        const date = new Date();
        // Atomically add a new region to the "regions" array field.
        updateDoc(doc(db, `users/${currentUser.uid}/notebooks/${notebookName}`), {
            income: arrayUnion({
                amount: parseInt(incomeInput),
                fulldate: date,
            })
        });
        
        setIncomeInput(0);
        setOpenModal(false);
    }

    const deleteTransaction = (index) => {

        let delIndex = notebook[0].transactions.indexOf(transaction[index]);
        let setup = notebook[0];
        let arr = notebook[0].transactions;
        arr.splice(delIndex, 1);
        setup.transactions = arr;
        setDoc(doc(db, `users/${currentUser.uid}/notebooks`, `${notebook[0].name}`), setup)
    }

    return (
        <>
            {
                (userid !== currentUser.uid) ?
                    <Notyou />
                    :

                    notebook.length === 0 ?
                        <Nonotebook /> :

                        <section className="balance section">

                            <div className="services__container mb-3 container grid layout__cards__container grid2">

                                <div className="flexy second__color p2">
                                    <div>
                                        <h2 className="section__title bigger__text wordBreak">{notebookName}</h2>
                                        <span className="section__subtitle less__margin__subtitle wordBreak">{notebook[0].description.charAt(0).toUpperCase() + notebook[0].description.slice(1)}</span>
                                    </div>
                                </div>

                                <div className='flexy second__color p2'>
                                    <div>
                                        <h2 className="section__title fontWeightNormal">Timeline</h2>
                                        <span className="section__subtitle less__margin__subtitle">Get details of current balance here</span>
                                        <div className="services__container container grid">
                                            <div
                                                onClick={() => { setOpenStartCalendar(true); }}
                                                className="button calendar__open__button flexy">
                                                {!startChoosen ? "Start Date" : `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}
                                            </div>
                                            <div
                                                onClick={() => { setOpenEndCalendar(true); }}
                                                className="button calendar__open__button flexy">
                                                {!endChoosen ? "End Date" : `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`}
                                            </div>
                                        </div>
                                        {
                                            openStartCalendar &&
                                            <Calendar
                                                setType={"start"}
                                                setDate={setStartDate}
                                                setChoosen={setStartChoosen}
                                                setCalendar={setOpenStartCalendar} />
                                        }

                                        {
                                            openEndCalendar &&
                                            <Calendar
                                                setType={"end"}
                                                setDate={setEndDate}
                                                setChoosen={setEndChoosen}
                                                setCalendar={setOpenEndCalendar} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="tab__container container grid">

                                <button
                                    onClick={() => {
                                        setBalance(true);
                                        setTransactionTab(false);
                                        setManage(false);
                                        setAdd(false);
                                    }}
                                    className={`button tab__button middle__button left__curve ${balance ? "active__button" : "body__background"}`}>
                                    Balance
                                </button>
                                <button
                                    onClick={() => {
                                        setBalance(false);
                                        setTransactionTab(true);
                                        setManage(false);
                                        setAdd(false);
                                    }}
                                    className={`button tab__button middle__button ${transactionTab ? "active__button" : "body__background"}`}>
                                    Transaction
                                </button>
                                <button
                                    onClick={() => {
                                        setBalance(false);
                                        setTransactionTab(false);
                                        setManage(true);
                                        setAdd(false);
                                    }}
                                    className={`button tab__button middle__button ${manage ? "active__button" : "body__background"}`}>
                                    Manage
                                </button>

                                <button
                                    onClick={() => {
                                        setBalance(false);
                                        setTransactionTab(false);
                                        setManage(false);
                                        setAdd(true);
                                    }}
                                    className={`button tab__button right__curve ${add ? "active__button" : "body__background"}`}>
                                    Add
                                </button>
                            </div>

                            {
                                openModal &&
                                <div className="services__modal">
                                    <div className="services__modal-content notebook__modal-content">
                                        <h4 className="services__modal-title">
                                            Add <br /> Income
                                        </h4>
                                        <i
                                            onClick={() => {
                                                setOpenModal(false);
                                                setIncomeValueError(false);
                                            }}
                                            className="uil uil-times services__modal-close"></i>

                                        <div class="services__form-content mb-3">
                                            <label for="" className="services__label">Insert Amount</label>
                                            <input
                                            onChange={(event)=>{
                                                setIncomeInput(event.target.value);
                                                setIncomeValueError(false);
                                            }}
                                            type="text" className="services__input" />
                                        </div>

                                        {
                                                incomeValueError &&
                                                <div className="info flex_space_between mb-3">
                                                    <div>
                                                        <i class="uil uil-user-exclamation info__icon"></i> Please enter a valid amount !!
                                                    </div>
                                                    <div className='flexy'>
                                                        <i
                                                            onClick={() => {
                                                                setIncomeInput('');
                                                                setIncomeValueError(false);
                                                            }}
                                                            className="uil uil-times error_close">
                                                        </i>
                                                    </div>
                                                </div>

                                            }


                                        <button 
                                        onClick={()=>{addIncome();}}
                                        className="flexy income__submit button">Submit</button>
                                    </div>
                                </div>
                            }

                            <div className='border__style'>
                                {
                                    balance &&
                                    <>

                                        <h2 className="section__title">Balance</h2>
                                        <span className="section__subtitle less__margin__subtitle">Get details of current balance here</span>
                                        <div className="services__container container grid marginBottom3">
                                            <div>
                                                <div onClick={() => { setOpenModal(true); }} className="balance__content">
                                                    <div className='balance__padding'>
                                                        <h4 className='flexy balance-title'>Total Balance</h4>
                                                        <div className=" flexy services__title">Rs {`${income}`}</div>
                                                        <div className='flexy'>
                                                            <div className="button income-button">
                                                                <i class="uil uil-link-add"></i>Add Balance
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="balance__content flexy">
                                                    <div className='balance__padding'>
                                                        <h4 className='flexy balance-title mb-3'>Current Balance</h4>
                                                        <div className=" flexy services__title">Rs {`${income - total}`}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                }

                                {
                                    transactionTab &&
                                    <>
                                        <h2 className="section__title">Transactions</h2>
                                        <span className="section__subtitle less__margin__subtitle">Get details of past transactions here</span>
                                        <div className="grid21 container grid marginBottom3">
                                            <div>
                                                <div className='section__title fontWeightNormal mt1'>
                                                    Categories
                                                </div>
                                                <div>
                                                    {
                                                        notebook[0].categories.map((element, index) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        (changeCategoryArr.indexOf(element) < 0) ?
                                                                            <>
                                                                                <button
                                                                                    onClick={() => { toggleCategory(element) }}
                                                                                    className={`category-layout-button category-layout-button-active`}>
                                                                                    {element}
                                                                                </button>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <button
                                                                                    onClick={() => { toggleCategory(element) }}
                                                                                    className={`category-layout-button`}>
                                                                                    {element}
                                                                                </button>
                                                                            </>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div>

                                                {
                                                    transaction.map((element, index) => {
                                                        return (
                                                            <>

                                                                {((
                                                                    (index === 0) ||
                                                                    (index !== 0 && (
                                                                        (new Date(transaction[index].fulldate.seconds * 1000).getDate() !== new Date(transaction[index - 1].fulldate.seconds * 1000).getDate()) ||
                                                                        (new Date(transaction[index].fulldate.seconds * 1000).getMonth() !== new Date(transaction[index - 1].fulldate.seconds * 1000).getMonth()) ||
                                                                        (new Date(transaction[index].fulldate.seconds * 1000).getFullYear() !== new Date(transaction[index - 1].fulldate.seconds * 1000).getFullYear())
                                                                    ))
                                                                )
                                                                    &&
                                                                    <div className="flexy mt1">
                                                                        {`${new Date(element.fulldate.seconds * 1000).getDate()}/${new Date(element.fulldate.seconds * 1000).getMonth() + 1}/${new Date(element.fulldate.seconds * 1000).getFullYear()}`}
                                                                    </div>
                                                                )}

                                                                <div className="flexy">
                                                                    <Flipcards element={element} index={index} deleteTransaction={deleteTransaction} />

                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                                {
                                    manage &&
                                    <>
                                        <Manage
                                            transaction={transaction}
                                            notebook={notebook[0]} />
                                    </>
                                }
                                {
                                    add && <>
                                        <Add uid={currentUser.uid} notebook={notebook[0]} />
                                    </>
                                }
                            </div>
                        </section>
            }

        </>
    )
}

export default NewBalance
