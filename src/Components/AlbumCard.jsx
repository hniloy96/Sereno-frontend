import 'AlbumCard.css'

import React from 'react'

export default function AlbumCard() {

fetch('http://localhost:4000/album')
.then(data => {
return data.json();
})
.then(album => {
console.log(album);
});
  return (
    <div>AlbumCard</div>
  )
}
