import React from 'react'
import './Card.scss'

export const Card = (props) => (

  <div className="card game-card box-shadow mx-2 p-2">
    <div className="d-flex justify-content-center align-items-center game-card-img-holder">
      <img className="card-img-top img-fluid" src={props.imgUrl} alt="Card image cap"/>
    </div>
    <h4 className="card-title game-card-name overflow-wrap">{ props.name }</h4>
    <p className="card-text">{ props.power }</p>
  </div>
)

export default Card
