import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Nav from "../Components/Nav"
import { getUserToken } from "../utilities/authToken"
import { useNavigate } from "react-router-dom"

const Show = (props) => {

    const token = getUserToken()
    const [album, setAlbum] = useState(null)
    const [comments, setComments] = useState(null)
    const [allTracks, setAllTracks] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const [newForm, setNewForm] = useState({
        comment: "",
        album: `${id}`
    })
    
    //These are the two links, one for the api call and another is for posting the comments
    const URL = `https://serenomusic.herokuapp.com/albums/${id}`
    const POST_URL = "https://serenomusic.herokuapp.com/comments/"
    const navigate = useNavigate()

    //getting the posts from the api
    const getPost = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            setTimeout(() => {
                setAlbum(result.album)
                setComments(result.comments)
                setAllTracks(result.album.tracks)
                setLoading(false)
            })

        } catch (err) {
            console.log(err)
        }
    }

    //calling on change with these to type into the form
    const handleChange = (e) => {
        const userInput = { ...newForm }
        userInput[e.target.name] = e.target.value
        setNewForm(userInput)
    }

    //loading all the data from the api, the album title, artist, tracks and comments
    const loaded = () => (
        <>
        <div className="album-top">
            <img className="cover" src={album.image} alt="cover-art" />
            <div className="title-artist">
                <h1 className="title-name">{album.title}</h1>
                <h3>{album.artist}</h3>
            </div>
        
            
            
        </div>
        <div className="album-bot">
            {allTracks?.map((alltrack) => {
                return (
                <div>
                    <h5 className="tracks-name">{alltrack}</h5>
                </div>
                )
                        })}
        </div>
        <div className="album-comment-section">
        <form className="compose-album-comment"  onSubmit={handleSubmitComment}>
                    <input 
                        className="write-comment"
                        type="text"
                        onChange={handleChange}
                        placeholder='Type your comment'
                        id="comment"
                        name="comment"
                        value={newForm.comment}
                        required
                    >

                    </input>
                    <button
                        className="submit-comment"
                        type="submit"
                    >Comment</button>
                </form>
                <div >
                    {comments?.map((comment) => {
                        return (
                            <h4 className="album-comments">{comment.comment}</h4>
                        )
                    })}
                </div>
        </div>
    

        </>

    )
    
    // this is submiting our comment to the backend 
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
            const result = await send.json()
            console.log(result)
            setComments([...comments, result])
            setNewForm({
                comment: "",
                album: `${id}`
            })
            
        
        } catch (err) {
            console.log(err)
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

        // calling the api though use effect
    useEffect(() => {
        getPost()
    }, [])

    // rending the info
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