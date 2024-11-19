import { useRef } from 'react';
import {NavLink} from "react-router-dom"
import './Navbar.css'

export const Navbar = () => {
const navRef = useRef(null);
  return (
      <nav className='nav' ref={navRef}>
        <div className='nav__wrapper'>
          <div className='nav__links'>
            <NavLink to='/' className='nav__link'>Главная</NavLink>
            <NavLink to='/texts' className='nav__link'>Товары</NavLink>
          </div>
          <div className='nav__mobile-wrapper'
                onClick={(event) => {
                    navRef.current.classList.toggle('active');
                    event.currentTarget.classList.toggle('active');}}
            >
                <div className='nav__mobile-target' />
                <div className='nav__mobile-menu' onClick={(event) => event.stopPropagation()}>
                    <NavLink to='/' className='nav__link'>Главная</NavLink>
                    <NavLink to='/texts' className='nav__link'>Товары</NavLink>
                </div>
            </div>
        </div>
      </nav>
  )
}