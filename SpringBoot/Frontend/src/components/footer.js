import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer className="footer w-100  text-center bg-light">
        <p>© 2021 – 22 E-Shopping, All Rights Reserved.</p>
        <NavLink to="/privacy">Privacy Policy </NavLink>
        <span>|</span>
        <NavLink to="/cookie"> Cookie Policy</NavLink>
      </footer>
    </>
  )
}
export default Footer
