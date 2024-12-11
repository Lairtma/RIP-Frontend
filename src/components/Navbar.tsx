import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ROUTES } from "../modules/MyRoutes"
import './Navbar.css'
import { Button } from "react-bootstrap"
import { setTextType  } from "../slices/dataSlice";
import { setId } from "../slices/orderSlice";
import { useDispatch } from "react-redux";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { api } from "../api";

export const Navbar = () => {
  
  const { id, count } = useSelector((state: RootState) => state.order);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [login, setLogin] = useState<string>(localStorage.getItem("login") || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      localStorage.removeItem("token");
      localStorage.removeItem("login");
      setIsAuthenticated(false);
      dispatch(setTextType(""));
      console.log(count);
      setLogin("");
      api.api.orderDelete(id, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // После успешного выполнения запроса, перенаправим на домашнюю страницу
    dispatch(setId(0));
      api.api.logoutCreate({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      navigate(ROUTES.TEXTS); // Перенаправление на главную страницу
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  useEffect(() => {
  }, [id]); // Перезапускаем useEffect, если filteredProducts изменились

  return (
    <nav className='nav'>
      <div className='nav__wrapper'>

        {isAuthenticated ? (
          <div className='nav__links'>
            <NavLink to={ROUTES.HOME} className='nav__link'>Главная</NavLink>
            <NavLink to={ROUTES.PROFILE} className='nav__link'>{login}</NavLink>
            <Button className='nav__link' onClick={handleAuthButtonClick}>Выход</Button>
            <NavLink to={ROUTES.TEXTS} className='nav__link'>Тексты</NavLink>
            <NavLink to={ROUTES.ORDER + "/" + id} className='nav__link' hidden={id === 0}>Корзина</NavLink>
          </div>
        ) : (
          <div className='nav__links'>
            <NavLink to={ROUTES.HOME} className='nav__link'>Главная</NavLink>
            <NavLink to={ROUTES.LOGIN} className='nav__link'>Вход</NavLink>
            <NavLink to={ROUTES.TEXTS} className='nav__link'>Тексты</NavLink>
          </div>
        )}

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

          {isAuthenticated ? (
            <div className='nav__mobile-menu' onClick={(event) => event.stopPropagation()}>
              <NavLink to={ROUTES.HOME} className='nav__link'>Главная</NavLink>
              <NavLink to={ROUTES.PROFILE} className='nav__link'>{login}</NavLink>
              <Button className='nav__link' onClick={handleAuthButtonClick}>Выход</Button>
              <NavLink to={ROUTES.TEXTS} className='nav__link'>Тексты</NavLink>
              <NavLink to={ROUTES.ORDER + "/" + id} className='nav__link' hidden={id === 0}>Корзина</NavLink>
            </div>
          ) : (
            <div className='nav__mobile-menu' onClick={(event) => event.stopPropagation()}>
              <NavLink to={ROUTES.HOME} className='nav__link'>Главная</NavLink>
              <NavLink to={ROUTES.LOGIN} className='nav__link'>Вход</NavLink>
              <NavLink to={ROUTES.TEXTS} className='nav__link'>Тексты</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}