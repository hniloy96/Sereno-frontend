import { useState, useEffect } from "react"
import './Home-page.css'
import { Link } from "react-router-dom"
import Nav from "../Components/Nav"
import { getUserToken } from "../utilities/authToken"

const Feed = (props) => {
    // this page again follows a similar structure to the feed page! 
    const token = getUserToken()
    const [posts, setPosts] = useState([])

    const BASE_URL = "https://serenomusic.herokuapp.com/albums/"

    const getPosts = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allPosts = await response.json()
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
                            <Link key={post._id} to={`/album/${post._id}`}>
                             <div className="tile" >
                                <img className="image" src={post.image} alt="cover-art"/>
                                <h1 className="text">{post.title}</h1>
                            </div>
                            </Link>
                           

                        )
                    })
                    }
                </section>
            </>
        )
    }

    const loading = () => (
        <section className="loading">
            <span>
                <img
                    className="spinner"
                    src="https://freesvg.org/img/1544764567.png"
                    alt="loading"
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