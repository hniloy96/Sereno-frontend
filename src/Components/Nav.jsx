import { Link } from "react-router-dom";
import { clearUserToken } from "../utilities/authToken"
import { useNavigate } from "react-router-dom";



const Nav = (props) => {

    const navigation = useNavigate()

    const handleSubmit = async (e) => {
       clearUserToken()
       navigation('/')
       

    }

    return (
        <div className="nav-list">
            <Link to="/feed">
                <h1 className="list-items">SERENO</h1>
            </Link>
            <Link to="/home">
                <div className="list-items">Home</div>
            </Link>
            <Link to="/feed">
                <div className="list-items">Feed</div>
            </Link>
            <button
                type="submit"
                className="log-out"
                onClick={handleSubmit}
                >
                    Log Out
                </button>
        </div>
    );
};

export default Nav;