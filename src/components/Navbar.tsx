import {NavLink} from "react-router-dom"
import './Navbar.css'

export const Navbar = () => {
  return (
      <nav className='nav'>
        <div className='nav__wrapper'>
          <div className='nav__links'>
            <NavLink to='/' className='nav__link'>Главная</NavLink>
            <NavLink to='/texts' className='nav__link'>Товары</NavLink>
          </div>
          <div className='nav__mobile-wrapper'
                onClick={(event) => {
                  event.currentTarget.classList.toggle('active');
                  const parentNav = event.currentTarget.closest('nav');
                  if (parentNav) {
                    parentNav.classList.toggle('active');
                  }
                }}
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