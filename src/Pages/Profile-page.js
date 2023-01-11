import React from "react";
import "./Profile-page.css"
import Nav from "../Components/Nav";

function Profile(props) {
    return (
        <div className="page">
            <div className="Profile-content-container">
                <h5>THIS IS Profile PAGE</h5>
            </div>
            <div className="nav-bar">
                <Nav />
            </div>
        </div>

    )
}

export default Profile