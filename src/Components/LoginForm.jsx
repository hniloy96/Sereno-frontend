import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../Pages/signin.css'

const LoginForm = ({ logIn }) => {

    const initialState = { username: "", password: "" }
    const [input, setInput] = useState(initialState)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdUserToken = await logIn(input)

        if (createdUserToken) {
            navigate("/home")
        } else {
            navigate("/")
        }
        setInput(initialState);
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };


    return (
        <section>
            <form className="login-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Log In</h1>
                <label htmlFor='username'>
                    <input
                        className="username"
                        type='text'
                        id='username'
                        name="username"
                        placeholder="User Name"
                        value={input.username}
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
                        value={input.password}
                        onChange={handleChange}
                        required

                    />
                </label>
                <input
                    className="submit"
                    type="submit"
                    value="Log in"
                />
            </form>
        </section>
    )
}

export default LoginForm