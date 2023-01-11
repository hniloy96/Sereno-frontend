import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './signin.css'


function Login(props) {

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
        } catch (err) {
            console.log(err)
        } 
        finally {
            navigate('/')
            
        } 

    }


    return (
        <section className="Signin-content-container">
            
            <form className="login-form" onSubmit={handleSubmit}>
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
                <input
                    className="submit"
                    type="submit"
                    value="Sign Up"
                />
            </form>
        </section>
    )
}

export default Login