import "./ProfilePage.css";
import { useState } from "react";
import { ROUTES, ROUTE_LABELS  } from "../modules/MyRoutes";
import { api } from "../api"; // Импорт API
import { BreadCrumbs } from "./BreadCrumbs"
import { Navbar } from "./Navbar";

export const ProfilePage = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    // Проверка авторизации
    const token = localStorage.getItem("token");

    if (!token) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "24px",
                fontWeight: "bold"
            }}>
                403, доступ запрещен
            </div>
        );
    }

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword) {
            setMessage("Пожалуйста, заполните оба поля.");
            return;
        }

        try {
            const response = await api.api.changeUserUpdate(
                {
                    old_password: oldPassword,
                    new_password: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data) {
                setMessage("Пароль успешно изменен.");
                setOldPassword("");
                setNewPassword("");
            }
        } catch (err: any) {
            if (err.response?.data?.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage("Произошла ошибка при смене пароля.");
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="MP_breadcrumbs">
                <BreadCrumbs
                    crumbs={[
                        { label: ROUTE_LABELS.PROFILE, path: ROUTES.PROFILE },
                    ]}
                />
            </div>
            <div className="container-profile">
                <h1 className="change-pass-h1">В личном кабинете есть возможность смены пароля</h1>
                <div className="change-password-form">
                    <input
                        type="password"
                        placeholder="Старый пароль"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="password-input text"
                    />
                    <input
                        type="password"
                        placeholder="Новый пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="password-input text"
                    />
                    <button
                        className="card_button btn"
                        onClick={handleChangePassword}
                    >
                        Сменить пароль
                    </button>
                    {message && <p className="error-message">{message}</p>}
                </div>
            </div>
        </>
    );
};