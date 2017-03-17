import React from 'react'
import './HiddenCard.scss'

export const HiddenCard = (props) => (

  <div className="card px-2 py-4 mx-2 box-shadow game-card" >
    <div className="d-flex justify-content-center align-items-center hidden-card-img-holder">
      <img className="card-img-top game-card-img" src="/img/card-reverse-dino.svg" alt="Card image cap"/>
    </div>
  </div>
)

export default HiddenCard
