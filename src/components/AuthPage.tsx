import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "../modules/MyRoutes";
import { api } from '../api';  // Путь к сгенерированному Api
import { BreadCrumbs } from "./BreadCrumbs"
import { Navbar } from "./Navbar";
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

    // Функция для обработки авторизации
    const handleAuth = async () => {
        try {
            const response = await api.api.loginUserCreate({
                login,
                password,
            });
            const data = response.data as LoginUserResponse;

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('login', login); // пример записи после авторизации
                navigate(ROUTES.TEXTS);
            }
        } catch (err: any) {
            // Обрабатываем ошибку авторизации
            if (err.response?.data?.error) {
                setError(err.response.data.error); // Отображаем сообщение об ошибке
            }
        }
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