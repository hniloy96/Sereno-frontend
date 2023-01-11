import React from "react";
import './Home-page.css'
import Nav from "../Components/Nav";

function Home(props) {
    return (
        <div className="page">
            <div className="Home-content-container">
                <h5>THIS IS HOME PAGE</h5>
            </div>
            <div className="nav-bar">
                <Nav />
            </div>
        </div>

    )
}

export default Home