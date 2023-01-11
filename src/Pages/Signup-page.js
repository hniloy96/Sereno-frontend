import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './signin.css'


function Signup(props) {

    const navigate = useNavigate()
    const [newForm, setNewForm] = useState({
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        dob: "",

    })

    const URL = "http://localhost:4000/user/register"


    function handleChange(e) {
        const userInput = { ...newForm };
        userInput[e.target.name] = e.target.value;
        console.log(e.target.name, e.target.value);
        setNewForm(userInput);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const currentState = { ...newForm }
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(currentState)
            }
            const response = await fetch(URL, requestOptions)
            const createdUser = await response.json()
            console.log(createdUser)
            setNewForm({
                username: "",
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                dob: "",
            })
            navigate('/')
        } catch (err) {
            console.log(err)
        } 
    }


    return (
        <section className="Signin-content-container ">
            
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Sing up</h1>
                <label  htmlFor='username'>
                    <input
                        className="username"
                        type='text'
                        id='username'
                        name="username"
                        placeholder="User Name"
                        value={newForm.username}
                        onChange={handleChange}
                        required

                    />
                </label>
                <label htmlFor='password'>
                    <input
                        className="username"
                        type='password'
                        id='password'
                        name="password"
                        placeholder="Enter Password"
                        value={newForm.password}
                        onChange={handleChange}
                        required

                    />
                </label>
                <label htmlFor='email'>
                    <input
                        className="email"
                        type='text'
                        id='email'
                        name="email"
                        placeholder="Email Address"
                        value={newForm.email}
                        onChange={handleChange}
                        required

                    />
                </label>
                <label htmlFor='firstname'>
                    <input
                        className="username"
                        type='text'
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                        value={newForm.firstname}
                        onChange={handleChange}
                        required

                    />
                </label>
                <label htmlFor='lastname'>
                    <input
                        className="username"
                        type='text'
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        value={newForm.lastname}
                        onChange={handleChange}
                        required

                    />
                </label>
                <label htmlFor='date'>
                    <input
                        className="username"
                        type='date'
                        id="dob"
                        name="dob"
                        placeholder="Date of Birth"
                        value={newForm.dob}
                        onChange={handleChange}
                        required

                    />
                </label>
                <input
                    className="submit"
                    type="submit"
                    value="Sign Up"
                />
            </form>
        </section>
    )
}

export default Signup