import React from 'react'
import './Card.scss'

export const Card = (props) => (
  <div className={`card game-card box-shadow mx-2 p-1 ${props.type}-faint-bkgrnd`}>
    <div className="d-flex justify-content-center align-items-center game-card-img-holder pb-1">
      <img className="game-card-img justify-content-center" src={props.imgUrl} alt="Card image cap"/>
    </div>
    <h4 className="card-title game-card-name overflow-wrap m-0">{ props.name.charAt(0).toUpperCase() + props.name.slice(1) }</h4>
    <span className={`game-card-text ${props.type}-bkgrnd circle d-inline-block mx-auto`}>{ props.power }</span>
    <span className="game-card-cost bkgrnd circle d-inline-block mx-auto overflow-wrap">DinoDollars{ props.cost }</span>
  </div>
)

export default Card
