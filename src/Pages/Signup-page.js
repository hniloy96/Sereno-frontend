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
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
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
        } catch (err) {
            console.log(err)
        } 
        finally {
           navigate('/')
    
        }

    }


    return (
        <section className="Signin-content-container ">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    User Name
                    <input
                        type='text'
                        id='username'
                        name="username"
                        placeholder="User Name"
                        value={newForm.username}
                        onChange={handleChange}

                    />
                </label>
                <label htmlFor='email'>
                    Email
                    <input
                        type='text'
                        id='email'
                        name="email"
                        placeholder="Email Address"
                        value={newForm.email}
                        onChange={handleChange}

                    />
                </label>
                <label htmlFor='password'>
                    Password
                    <input
                        type='password'
                        id='password'
                        name="password"
                        placeholder="Enter Password"
                        value={newForm.password}
                        onChange={handleChange}

                    />
                </label>
                <label htmlFor='firstname'>
                    First Name
                    <input
                        type='text'
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                        value={newForm.firstname}
                        onChange={handleChange}

                    />
                </label>
                <label htmlFor='lastname'>
                    Last Name
                    <input
                        type='text'
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        value={newForm.lastname}
                        onChange={handleChange}

                    />
                </label>
                <label htmlFor='image'>
                    Date
                    <input
                        type='date'
                        id="dob"
                        name="dob"
                        placeholder="Date of Birth"
                        value={newForm.dob}
                        onChange={handleChange}

                    />
                </label>
                <input
                    type="submit"
                    value="Submit"
                />
            </form>
        </section>
    )
}

export default Signup