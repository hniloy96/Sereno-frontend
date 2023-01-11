import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import Nav from "../Components/Nav"
import { getUserToken } from "../utilities/authToken"

const Show = (props) => {

    const token = getUserToken()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [newForm, setNewForm] = useState({
        body: ""
    })

    const { id } = useParams()
    console.log(id)
    const navigate = useNavigate()
    const URL = `http://localhost:4000/posts/${id}`


    const getPost = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            console.log(result)
            setTimeout(() => {
                setPost(result)
                setLoading(false)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const loaded = () => (
        <>
            
                <div className="Big-post">     
                    <h2>{post.body}</h2>
                    <div>
                        <button className="delete" onClick={removePost}>
                            Delete post
                        </button>
                    </div>
                </div>




        </>

    )

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
        </div>

    )
}

export default Show