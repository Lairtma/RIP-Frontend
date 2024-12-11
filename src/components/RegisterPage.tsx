import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "../modules/MyRoutes";
import { api } from '../api';  // Путь к сгенерированному Api
import { BreadCrumbs } from "./BreadCrumbs"
import { Navbar } from "./Navbar";
import "./RegisterPage.css";

interface RegisterUserResponse {
    message: string;
}

export const RegisterPage: FC = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null); // Для сообщения от сервера
    const navigate = useNavigate();

    const handleAuth = async () => {
        try {
            const response = await api.api.registerUserCreate({
                login,
                password,
            });
            const data = response.data as RegisterUserResponse;

            // Устанавливаем сообщение из ответа сервера
            setMessage(data.message || "Успех");
        } catch (err: any) {
            if (err.response?.status === 500 && err.response?.data?.message) {
                setMessage(err.response.data.message); // Сообщение от сервера при 500
            } else if (err.response?.data?.error) {
                setMessage(err.response.data.error); // Сообщение для других ошибок
            } else {
                setMessage("Произошла ошибка. Попробуйте снова."); // Общая ошибка
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="MP_breadcrumbs">
                <BreadCrumbs
                    crumbs={[
                        { label: ROUTE_LABELS.REGISTER, path: ROUTES.REGISTER },
                    ]}
                />
            </div>
            <div className="space-auth">
                <div className="container-auth">
                    <div className="container-header-auth">
                        <span className="h2-auth-to-auth text_card">Регистрация / </span>
                        <Link to={ROUTES.LOGIN} className="no-underline-auth">
                            <span className="h2-auth-to-reg text_card">Авторизация</span>
                        </Link>
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

                        <div className="container-data-auth-password">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Вывод сообщения от сервера */}
                        {message && <div className="error-message">{message}</div>}

                        <button className="card_button btn" onClick={handleAuth}>
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};