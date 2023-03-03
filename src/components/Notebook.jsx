import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../styles/notebook.css'
import { auth, db, storage } from "../firebase.config";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import {
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";

const Notebook = () => {

    const { currentUser } = useContext(AuthContext)

    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [current, setCurrent] = useState("");
    const [notebookName, setNotebookName] = useState("");
    const [notebookDescription, setNotebookDescription] = useState("");

    const [user, setUser] = useState([]);
    const [notebooks, setNotebooks] = useState([]);

    const [error, setError] = useState(false);
    const [lengthError, setLengthError] = useState(false);
    const [notebookError, setNotebookError] = useState(false);
    const [notebookPresent, setNotebookPresent] = useState(false);

    const blogsCollectionRef = collection(db, `users/${currentUser.uid}/notebooks`);
    const sortRef = query(blogsCollectionRef, orderBy('createdAt', 'desc'));


    const usersCollectionRef = collection(db, `users`);

    useEffect(() => {

        onSnapshot(usersCollectionRef, (snapshot) => {
            const users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })

            const result = users.filter((element, index) => {
                return (element.uid === currentUser.uid);
            })

            setUser(result);
        });

    }, [currentUser]);

    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            const result = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })
            setNotebooks(result);

        });
    }, [currentUser]);

    function isAlphanumericAndSpace(str) {
        return /^[a-zA-Z0-9 ]+$/i.test(str)
    }

    //  add 
    const addNotebook = (event) => {

        event.preventDefault();

        if (!isAlphanumericAndSpace(notebookName.trim())) {
            setNotebookError(true);
            return;
        }


        if (!isAlphanumericAndSpace(notebookDescription.trim())) {
            setNotebookError(true);
            return;
        }

        if (user.length > 0 && (user[0].notebooks.indexOf(notebookName.trim()) > (-1))) {
            setNotebookPresent(true);
            return;
        }

        const submitCategoryArray = categories;
        submitCategoryArray.push("Others")
        setCategories(categories => [...categories, "others"])
        const docRef = doc(db, `users/${currentUser.uid}/notebooks/${notebookName}`);
        setDoc(docRef, {
            name: notebookName.trim(),
            description: notebookDescription.trim(),
            categories: submitCategoryArray,
            transactions: [],
            income: 0,
            createdAt: serverTimestamp(),
        })

        const notebookRef = doc(db, `users/${currentUser.uid}`);
        updateDoc(notebookRef, {
            notebooks: arrayUnion(`${notebookName}`)
        })

        setNotebookName("");
        setNotebookDescription("");
        setCategories([]);
        setCurrent("");
        setOpenModal(false);

    }

    const deleteNotebook = (index, name) => {
        console.log(index, name);
        deleteDoc(doc(db, `users/${currentUser.uid}/notebooks/${name}`));
        const arr = notebooks.filter((element, i) => {
            return (i !== index);
        });

        updateDoc(doc(db, `users/${currentUser.uid}`), {
            notebooks: arr,    
        });
    }

    const submitCategory = () => {
        if (!categories.includes(current.trim())) {
            if (isAlphanumericAndSpace(current.trim())) {
                if (categories.length < 100) {
                    setCategories(categories => [...categories, current.trim()])
                }
                else {
                    setLengthError(true);
                }
            }
            else {
                setError(true);
            }
        }
        setCurrent("");
    }

    const delCategory = (index) => {
        const arr = categories.filter((category, i) => {
            return (i !== index);
        });
        setCategories(arr);
    }

    return (
        <>
            <section className="section">
                <h2 className="section__title">Notebooks</h2>
                <span className="section__subtitle">Get in touch</span>
                <div className="contact__container container grid">

                    {
                        notebooks.map((notebooki, index) => {
                            return (
                                <div key={index}>
                                    <div className="services__content">
                                        <div>
                                            <i className="uil uil-notes services__icon"></i>
                                            <h3 className="services__title">{notebooki.name}<br /> Expenses</h3>
                                        </div>
                                        <div className='flex-space-between'>
                                            <Link
                                                to={`/notebook/${currentUser.uid}/${notebooki.name}`}
                                                className="button custom-height-notebooks button--flex button--small button--link services__button">
                                                View More
                                                <i className="uil uil-arrow-right button__icon"></i>
                                            </Link>
                                            <i onClick={()=>{deleteNotebook(index, notebooki.name)}} class="uil uil-trash-alt notebook-delete-icon"></i>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }

                    <div>
                        <div className="services__content">
                            <div>
                                <i className="uil uil-create-dashboard services__icon"></i>
                                <h3 className="services__title">Add <br /> Notebook</h3>
                            </div>
                            <span
                                onClick={() => {
                                    setOpenModal(true);
                                    setCurrent("");
                                    setCategories([]);
                                    setNotebookName("");
                                    setNotebookDescription("");
                                }}
                                className="button button--flex button--small custom-height-notebooks button--link services__button">
                                Add
                                <i className="uil uil-arrow-right button__icon"></i>
                            </span>
                            {
                                openModal &&
                                <div className="services__modal">
                                    <div className="services__modal-content notebook__modal-content">
                                        <h4 className="services__modal-title">
                                            New <br /> Notebook
                                        </h4>
                                        <i
                                            onClick={() => {
                                                setOpenModal(false);
                                                setCurrent("");
                                                setCategories([]);
                                                setNotebookName("");
                                                setNotebookDescription("");
                                            }}
                                            className="uil uil-times services__modal-close"></i>
                                        <form onSubmit={addNotebook} className="services__form grid">


                                            {
                                                notebookError &&
                                                <div className="info flex_space_between">
                                                    <div>
                                                        <i class="uil uil-user-exclamation info__icon"></i> Only a-z, A-Z, 0-9 and spaces allowed
                                                    </div>
                                                    <div className='flexy'>
                                                        <i
                                                            onClick={() => {
                                                                setNotebookError(false);
                                                                setNotebookError("");
                                                            }}
                                                            className="uil uil-times error_close">
                                                        </i>
                                                    </div>
                                                </div>

                                            }

                                            <div class="services__form-content">
                                                <label for="" className="services__label">Notebook Name</label>
                                                <input
                                                    required
                                                    value={notebookName}
                                                    onChange={(event) => { setNotebookName(event.target.value).toLowerCase() }}
                                                    type="text" className="services__input" />
                                            </div>


                                            {
                                                notebookPresent &&
                                                <div className="info flex_space_between">
                                                    <div>
                                                        <i class="uil uil-user-exclamation info__icon"></i> Already a notebook present
                                                    </div>
                                                    <div className='flexy'>
                                                        <i
                                                            onClick={() => {
                                                                setNotebookPresent(false);
                                                                setCurrent("");
                                                            }}
                                                            className="uil uil-times error_close">
                                                        </i>
                                                    </div>
                                                </div>

                                            }

                                            <div class="services__form-content">
                                                <label for="" className="services__label">Notebook Description</label>
                                                <input
                                                    required
                                                    value={notebookDescription}
                                                    onChange={(event) => { setNotebookDescription(event.target.value) }}
                                                    type="text" className="services__input" />
                                            </div>

                                            <div className="info">
                                                <i class="uil uil-user-exclamation info__icon"></i> You can add max 99 extra categories
                                            </div>

                                            {
                                                error &&
                                                <div className="info flex_space_between">
                                                    <div>
                                                        <i class="uil uil-user-exclamation info__icon"></i> Only a-z, A-Z, 0-9 and spaces allowed
                                                    </div>
                                                    <div className='flexy'>
                                                        <i
                                                            onClick={() => {
                                                                setError(false);
                                                                setCurrent("");
                                                            }}
                                                            className="uil uil-times error_close">
                                                        </i>
                                                    </div>
                                                </div>

                                            }


                                            {
                                                lengthError &&
                                                <div className="info flex_space_between">
                                                    <div>
                                                        <i class="uil uil-user-exclamation info__icon"></i> Only 99 extra categories allowed 😅
                                                    </div>
                                                    <div className='flexy'>
                                                        <i
                                                            onClick={() => {
                                                                setLengthError(false);
                                                                setCurrent("");
                                                            }}
                                                            className="uil uil-times error_close">
                                                        </i>
                                                    </div>
                                                </div>

                                            }

                                            <div className="category__storage grid">
                                                {
                                                    categories.map((category, index) => {
                                                        return (
                                                            <>
                                                                <span className='category__span' key={index}>
                                                                    {category}
                                                                    <i
                                                                        onClick={() => { delCategory(index) }}
                                                                        class="uil uil-fire firstColor delete__category"></i></span>
                                                            </>
                                                        )
                                                    })
                                                }
                                                <span className='category__span'>Others</span>

                                            </div>

                                            <div className="grid grid2">
                                                <div className='services__form-content'>

                                                    <label for="" className="services__label">Add Categories</label>
                                                    <input
                                                        value={current}
                                                        onChange={(event) => { setCurrent(event.target.value) }}
                                                        className='services__input' type="text" />
                                                </div>
                                                <span
                                                    onClick={() => { submitCategory(); }}
                                                    className='flexy button'>Add</span>
                                            </div>
                                            <button className="flexy notebook__submit button">Submit</button>
                                        </form>

                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Notebook