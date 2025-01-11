import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "../modules/MyRoutes";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { fetchRequestsThunk } from "../modules/thunks/allreqsThunk";
import { Navbar } from "./Navbar";
import "./AllRequestsPage.css"; // Подключение стилей
import { DsEncOrDecOrder } from "../api/Api";
import { useDispatch } from "react-redux";

export const AllRequestPage = () => {
    const [requests, setRequests] = useState<DsEncOrDecOrder[]>([]); // Стейт для хранения списка заявок
    const [loading, setLoading] = useState<boolean>(true); // Стейт для загрузки
    const [error, setError] = useState<string | null>(null); // Стейт для ошибки
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchRequestsThunk());
    }, [dispatch]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${date.getFullYear()}`;
    };

    if (loading) {
        return <div>Загрузка данных...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const statusToText = (status: number): string => {
        switch (status) {
            case 0:
                return "Черновик";
            case 1:
                return "Сформирована";
            case 2:
                return "Завершена";
            case 3:
                return "Удалена";
            case 4:
                return "Отклонена";
            default:
                return "Отклонена";
        }
    };

    return (
        <div className="all-requests-page">
            
            <Navbar />
            <div className="MP_breadcrumbs">
                <BreadCrumbs
                    crumbs={[
                        { label: ROUTE_LABELS.REQUESTS, path: ROUTES.REQUESTS },
                    ]}
                />
            </div>

            <div className="requests-table-container">
                <h1 className="card_text">Список заявок</h1>
                <table className="requests-table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Статус заявки</th>
                            <th>Дата создания</th>
                            <th>Дата обновления</th>
                            <th>Дата завершения</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((request, index) => (
                                <tr key={request.id}>
                                    <td>{index + 1}</td>
                                    <td>{request.status}</td>
                                    <td>{formatDate(request.date_create)}</td>
                                    <td>{formatDate(request.date_update)}</td>
                                    <td>{request.date_finish === "0001-01-01T03:00:00+03:00" ? "Не завершена" : formatDate(request.date_finish)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>Заявки не найдены.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="actions">
                <Link to={ROUTES.TEXTS} className="card_button btn card_text">
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
    
};