import React from 'react'

export const Card = (props) => (
  <div className="card" style={{ margin: '0 auto' }} >
    <img class="card-img-top" src=" { imgUrl }  " alt="Card image cap">
    <div class="card-block">
      <h4 class="card-title">{ name }</h4>
      <p class="card-text">{ power }</p>
    </div>
  </div>
)
