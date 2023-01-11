import { useState, useEffect } from "react"
import './Feed-page.css'
import { Link } from "react-router-dom"
import Nav from "../Components/Nav"

const Feed = (props) => {

    const [posts, setPosts] = useState([])
    const [newForm, setNewForm] = useState({
        name: "",
        image: "",
        title: ""
    })

    const BASE_URL = "http://localhost:4000/posts/"

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
                <section className="posts-list">
                    {posts?.map((post) => {
                        return (
                            <div className="post-card" key={post._id}>
                                <h1>{post.body}</h1>
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
            <div className="Feed-content-container">
                <div className="create-post">
                    <h2>Post</h2>
                    <form>
                        <label htmlFor='post'>
                            <input
                                type='text'
                                id="name"
                                name="name"
                                placeholder="Share your thoughts"
                                value={newForm.name}
                            />
                        </label>
                        <input
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
                {posts && posts.length ? loaded() : loading()}
            </div>

            <div className="nav-bar">
                <Nav />
            </div>
        </div>

    )
}

export default Feed