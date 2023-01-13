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
        body: "",
    })

    const { id } = useParams()
    console.log(id)
    const navigate = useNavigate()
    const URL = `http://localhost:4000/posts/${id}`


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
                <form onSubmit={updatePost}>
                <input
                                className="update-box"
                                type='text'
                                id="body"
                                name="body"
                                placeholder={post.body}
                                value={newForm.body}
                                onChange={handleChange}
                                required
                    />
                    <button type="submit">Update</button>
                </form>
            </div>




        </>

    )

    const updatePost = async (e) => {
        e.preventDefault()
        const currentState = { ...newForm }
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentState)
            }
            const response = await fetch(URL, requestOptions)
            const createdComment = await response.json()
            console.log(createdComment)
            setComments([...comments, createdComment])
            navigate(`/post/${id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const userInput = { ...newForm }
        userInput[e.target.name] = e.target.value
        setNewForm(userInput)
    }

    const isLoading = () => (
        <section className="people-list">
            <h1>
                Loading...
                <span>
                    <img
                        className="spinner"
                        src="https://freesvg.org/img/1544764567.png"
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