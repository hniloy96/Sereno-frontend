import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Nav from "../Components/Nav"

const Show = (props) => {

    const [album, setAlbum] = useState(null)
    const [ allTracks, setAllTracks] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const URL = `https://serenomusic.herokuapp.com/albums/${id}`
   


    const getPost = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            setTimeout(() => {
                setAlbum(result)
                setAllTracks(result.tracks)
                setLoading(false)
            })

        } catch (err) {
            console.log(err)
        }
    }



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
    

        </>

    )

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