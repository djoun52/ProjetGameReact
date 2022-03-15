import React, { useState} from 'react'
import axios from 'axios';
import './FormAddMots.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

export default function FormaddMots() {
    const [motsAdd, setMotsAdd] = useState({
        contenue: ""
    })
    const [errorForm, setErrorForm] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleForm = (e) => {
        e.preventDefault();
        console.log(motsAdd)
        
        axios.post('http://localhost:4000/addmots', motsAdd, { withCredentials: true })
            .then(response => {
                setErrorForm(false)
                navigate("/")
            })
            .catch(() => {
                setErrorForm(true)
            });
    }
    const changeInput = (e) => {

        if (e.target.classList.contains('inp-mots')) {
            const newObjState = { ...motsAdd, contenue: e.target.value };
            setMotsAdd(newObjState);
        }
    }

    return (
        <>
            <form className="container-form" onSubmit={handleForm}>
                <input
                    type="text"
                    name="mots"
                    id="mots"
                    className='inp-mots'
                    value={motsAdd.contenue}
                    onInput={changeInput}
                    placeholder="Entrez votre nouveau mots"
                />
                <button type="submit">ajouter</button>
            </form>
            {errorForm && (
                <h2>mots déja ajouté</h2>
            )}
        </>
    )
}
