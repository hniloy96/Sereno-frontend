import { useContext } from 'react'
import { UserContext } from '../data'
import { getUserToken, setUserToken, clearUserToken } from '../utilities/authToken'
import LoginForm from '../Components/LoginForm'
import './signin.css'
import { Link } from 'react-router-dom'




function Auth() {
	const {setAuth, setUser} = useContext(UserContext)

    const loginUser = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
    
            const response = await fetch(
                "http://localhost:4000/user/login",
                configs
            )
    
            const currentUser = await response.json()
            //console.log(currentUser)
    
            if (currentUser.token) {
                // sets local storage
                setUserToken(currentUser.token)
                // put the returned user object in state
                setUser(currentUser.user)
                setAuth(currentUser.isLoggedIn)
    
                return currentUser
            } else {
                throw `Server Error: ${currentUser.statusText}`
            }
        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
        }
    }
    


  return (
        <div>
            <div className="Signin-content-container">
                <LoginForm  logIn={loginUser} />
                <Link className='link-container' to='/signup'>
                    <h3 className='link'>Sign Up Here</h3>
                </Link>
            </div>
            
        </div>
        
    )
}

export default Auth;

