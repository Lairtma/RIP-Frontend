import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "../modules/MyRoutes";
import { loginUser } from "../modules/MyApiTexts";
import { BreadCrumbs } from "./BreadCrumbs"
import { Navbar } from "./Navbar";
import { useDispatch  } from "react-redux";
import { AppDispatch } from "../store";
import "./AuthPage.css";

// Определяем тип данных ответа, который возвращается с сервера
interface LoginUserResponse {
    token: string;
}

export const AuthPage: FC = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // Функция для обработки авторизации
    const handleAuth = () => {
        dispatch(loginUser({ login, password }))
          .unwrap()
          .then((data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("login", login);
            navigate(ROUTES.HOME);
          })
          .catch(() => {
            
          });
      };

    return (
        <div>
            <Navbar />
            <div className="MP_breadcrumbs">
                <BreadCrumbs
                    crumbs={[
                        { label: ROUTE_LABELS.LOGIN, path: ROUTES.LOGIN },
                    ]}
                />
            </div>
            <div className="space-auth">
                <div className="container-auth">
                    <div className="container-header-auth">
                        <Link to={ROUTES.REGISTER} className="no-underline-auth">
                            <span className="h2-auth-to-reg text_card">Регистрация</span>
                        </Link>
                        <span className="h2-auth-to-auth text_card"> / Авторизация</span>
                    </div>

                    <div className="container-data-auth">
                        <div className="container-data-auth-login text">
                            <input
                                type="text"
                                placeholder="Login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>

                        <div className="container-data-auth-password text">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button className="card_button btn" onClick={handleAuth}>
                            Авторизоваться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};