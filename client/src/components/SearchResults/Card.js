import React from 'react'
import './card.css';
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
function Card({username,profilePicture}) {
  return (
    <div className='containerSearch'>
        <div className='imageSearch'>
            <img className='imgSearch' alt={username} src={
                  profilePicture
                    ? PF + profilePicture
                    : PF + "person/noAvatar.png"
                }></img>
        </div>
        <div className='name'>
            {username}
        </div>
    </div>
  )
}

export default Card