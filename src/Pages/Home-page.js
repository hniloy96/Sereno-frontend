import { useState, useEffect } from "react"
import './Home-page.css'
import { Link } from "react-router-dom"
import Nav from "../Components/Nav"
import { getUserToken } from "../utilities/authToken"

const Feed = (props) => {

    const token = getUserToken()
    const [posts, setPosts] = useState([])
    const [newForm, setNewForm] = useState({
        body: "",
        comments: [],
    })

    const BASE_URL = "http://localhost:4000/album/"

    const getPosts = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allPosts = await response.json()
            console.log(allPosts)
            setPosts(allPosts)

        } catch (err) {
            console.log(err)
        }
    }

    const loaded = () => {
        return (
            <>
                <section >
                    {posts?.map((post) => {
                        return (
                            <div className="tile" key={post._id}>
                                <img className="image" src={post.image} />
                                <p className="text">{post.title}</p>
                            </div>

                        )
                    })
                    }
                </section>
            </>
        )
    }

    const loading = () => (
        <section className="people-list">
            <span>
                <img
                    className="spinner"
                    src="https://freesvg.org/img/1544764567.png"
                />{" "}
            </span>
        </section>
    );

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="page">
            <div className="Home-content-container">
                {posts && posts.length ? loaded() : loading()}
            </div>

            <div className="nav-bar">
                <Nav />
            </div>
        </div>

    )
}

export default Feed