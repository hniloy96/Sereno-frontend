import React, { useState } from 'react';
import './Home-page.css';
import '../Components/AlbumCard.css';

function Home(props) {
  const [album, setAlbum] = useState([]);
  fetch('http://localhost:4000/album')
    .then((data) => {
      return data.json();
    })
    .then((albumData) => {
      console.log(albumData);
      setAlbum(albumData);
    });

  return (
    <div className="Home-content-container">
      {album.map((info, index) => {
        return (
          <div className="album" key={index}>
            <img className="coverPhoto" src={info.image} alt="umbrella"></img>
            <div className="albumText">
              <div className="albumTitle">{info.title}</div>
              <div className="albumDescription">{info.artist}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
