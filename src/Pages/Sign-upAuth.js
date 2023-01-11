import { useContext } from 'react'
import { UserContext } from '../data'
import { getUserToken, setUserToken, clearUserToken } from '../utilities/authToken'
import RegisterForm from '../Components/RegisterForm'
import { Link } from 'react-router-dom'




function Auth() {
	const {setAuth, setUser} = useContext(UserContext)

    const registerUser = async (data) => {
        try {
    
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
    
            const newUser = await fetch(
                "http://localhost:4000/user/register",
                configs
            )
    
            const parsedUser = await newUser.json()
            console.log(parsedUser)
        
            setUserToken(parsedUser.token)
           
            setUser(parsedUser.user)
  
            setAuth(parsedUser.isLoggedIn)
    
         
    
            return parsedUser

        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
        }
    }

  return (
        <div>
            <div className="Signin-content-container">
                <RegisterForm signUp={registerUser} />
                <Link className='link-container' to='/'>
                    <h3 className='link'>Log in Here</h3>
                </Link>
            </div>
        </div>
        
    )
}

export default Auth;

