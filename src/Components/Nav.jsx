import { Link } from "react-router-dom";

const Nav = (props) => {
    return (
        <div className="nav-list">
            <Link to="/">
                <h1 className="list-items">SERENO/LOGO</h1>
            </Link>
            <Link to="/">
                <div className="list-items">Home</div>
            </Link>
            <Link to="/feed">
                <div className="list-items">Feed</div>
            </Link>
            <Link to="/profile">
                <div className="list-items">Pofile</div>
            </Link>
        </div>
    );
};

export default Nav;