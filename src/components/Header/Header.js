import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div className='d-flex align-items-center justify-content-center'>
    <img src="/icons/pixos-logo.png" className='mr-3' alt="pixos logo" width="50" height="50"></img>
    <h1 className='m-0 pixos-header'>Pixos</h1>
  </div>
)

export default Header
