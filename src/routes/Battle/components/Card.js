import React from 'react'

export const Card = (props) => (

  <div className="card-item mx-1 my-2">
    <img className="card-img-fluid" src={props.imgUrl} alt="Responsive image"/>
      <h4 className="card-title">{ props.name }</h4>
      <p className="card-text">{ props.power }</p>
    </div>
)

export default Card
