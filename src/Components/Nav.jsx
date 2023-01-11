import { Link } from "react-router-dom";

const Nav = (props) => {
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
        </div>
    );
};

export default Nav;