import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import Nav from "../Components/Nav"
import './Album.css'

const Show = (props) => {

    const [album, setAlbum] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const URL = `http://localhost:4000/albums/${id}`
   


    const getPost = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            console.log(result)
            setTimeout(() => {
                setAlbum(result)
                setLoading(false)
            })

        } catch (err) {
            console.log(err)
        }
    }



    const loaded = () => (
        <>
        <div>
            <img className="cover" src={album.image} />
        </div>
    

        </>

    )

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