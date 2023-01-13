import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import Nav from "../Components/Nav"
import { getUserToken } from "../utilities/authToken"

const Show = (props) => {

    const token = getUserToken()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(true)
    const [newForm, setNewForm] = useState({
        comments: "",
    })

    const { id } = useParams()
    console.log(id)
    const navigate = useNavigate()
    const URL = `https://serenomusic.herokuapp.com/posts/${id}`
    const POST_URL = "https://serenomusic.herokuapp.com/interaction/"


    const getPost = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            console.log(result.comments)
            setTimeout(() => {
                setPost(result.post)
                setComments(result.comments)
                setLoading(false)
            })

        } catch (err) {
            console.log(err)
        }
    }



    const loaded = () => (
        <>

            <div className="Big-post">

                <div className="update-delete">
                    <Link className="update" to={`/post-update/${id}`}>
                        <button className="update-button">Edit</button>
                    </Link>
                    
                    <button className="delete-button" onClick={removePost}>
                        Delete post
                    </button>
                </div>
                <h2>{post.body}</h2>
                <form className="comment-section" onSubmit={handleSubmitComment}>
                    <input 
                        className="write-comment"
                        type="text"
                        onChange={handleChange}
                        placeholder='Type your comment'
                        id="comments"
                        name="comments"
                        value={newForm.comments}
                        required
                    >

                    </input>
                    <button
                        className="submit-comment"
                        type="submit"
                    >Comment</button>
                </form>
                <div>
                    {comments?.map((comment) => {
                        return (
                            <h4>{comment.comments}</h4>
                        )
                    })}
                </div>
            </div>




        </>

    )

    const handleSubmitComment = async (e) => {
        e.preventDefault()
        const currentState = { ...newForm }
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentState)
            }
            const send = await fetch(POST_URL, requestOptions)
            const response = await fetch(URL)
            const createdComment = await response.json()
            console.log(createdComment)
            setComments([...comments, createdComment])
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const userInput = { ...newForm }
        userInput[e.target.name] = e.target.value
        setNewForm(userInput)
    }

    const removePost = async () => {
        try {
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }

            const response = await fetch(URL, options)
            const deletedPerson = await response.json()
        } catch (err) {
            navigate(URL)
        } finally {
            navigate('/feed')
        }
    }

    const isLoading = () => (
        <section className="loading">
            <h1>
                Loading...
                <span>
                    <img
                        className="spinner"
                        src="https://freesvg.org/img/1544764567.png"
                        alt="loading"
                    />{" "}
                </span>
            </h1>
        </section>
    );


    useEffect(() => {
        getPost()
    }, [])

    return (
        <div className="page">
            <div className="Feed-content-container">
                <div>
                    {loading ? isLoading() : loaded()}
                </div>

            </div>
            <div className="nav-bar">
                <Nav />
            </div>
        </div>

    )
}

export default Show