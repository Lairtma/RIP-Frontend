import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderPage.css"; // Подключаем стили корзины
import { Navbar } from "./Navbar";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { OrderResponse } from "../modules/MyInterface";
import { getOrderByID } from "../modules/MyApiTexts";
import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "../modules/MyRoutes";
import { setId  } from "../slices/orderSlice";
import { useDispatch } from "react-redux";
import { api } from '../api';  // Путь к сгенерированному Api


export const OrderPage: FC = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const [basketData, setBasketData] = useState<OrderResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchBasketData = async () => {
            if (!id) {
                setError("ID заявки отсутствует в URL.");
                setLoading(false);
                return;
            }

            try {
                const data = await getOrderByID(parseInt(id));
                console.log("Данные, полученные от нашего API по заявке", data);
                if (data) {
                    setBasketData(data);
                } else {
                    setError("Не удалось получить данные корзины.");
                }
            } catch (err) {
                console.error("Ошибка при загрузке данных корзины:", err);
                setError("Произошла ошибка при загрузке данных.");
            } finally {
                setLoading(false);
            }
        };

        fetchBasketData();
    }, [id]);

    // Получаем токен из localStorage
    const token = localStorage.getItem('token');

    // Обработчик оформления заявки
    const handleConfirm = async () => {
        try {
            // Вызовите метод API для оформления заявки с Bearer Auth
            await api.api.orderFormUpdate(parseInt(id!), {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // После успешного выполнения запроса, перенаправим на домашнюю страницу
            dispatch(setId(0));
            navigate(ROUTES.HOME);
        } catch (err) {
            console.error("Ошибка при оформлении заявки:", err);
            alert("Произошла ошибка при оформлении заявки.");
        }
    };

    
    // Обработчик удаления заявки
    const handleDeleteBasket = async () => {
        try {
            // Вызовите метод API для удаления заявки с Bearer Auth
            await api.api.orderDelete(parseInt(id!), {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // После успешного выполнения запроса, перенаправим на домашнюю страницу
            dispatch(setId(0));
            navigate(ROUTES.HOME);
        } catch (err) {
            console.error("Ошибка при удалении заявки:", err);
            alert("Произошла ошибка при удалении заявки.");
        }
    };

    // Обработчик удаления блюда
    const handleDeleteProduct = async (textId: number) => {
        try {
            // Вызовите метод API для удаления блюда с Bearer Auth
            await api.api.orderTextDelete(id!, {id: id!, text_id: textId}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // После успешного удаления блюда обновим корзину
            setBasketData((prevData) => {
                if (prevData?.Texts) {
                    const updatedTexts = prevData.Texts.filter(text => text.id !== textId);
                    return { ...prevData, Texts: updatedTexts };
                }
                return prevData;
            });

            alert("Текст успешно удален.");
        } catch (err) {
            console.error("Ошибка при удалении текст:", err);
            alert("Произошла ошибка при удалении текст.");
        }
    };

    if (loading) {
        return <div>Загрузка данных...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="MP_breadcrumbs">
                <BreadCrumbs
                    crumbs={[
                        { label: ROUTE_LABELS.ORDER, path: ROUTES.ORDER },
                    ]}
                />
            </div>
            <div className="container-basket">
                <div className="basket-cards">
                    {basketData?.Texts?.map((text) => (
                        <div key={text.id} className="basket-card">
                            <img src={text.img} className="basket-image" />
                            <div className="basket-info">
                                <pre className="card_text text_card">{text.text.replace("/n", "\n")}</pre>
                            </div>
                            <button 
                                onClick={() => handleDeleteProduct(text.id)} 
                                className="btn card_text cart_btn card_button"
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </div>
                <div className="down_nav">
                    <p className="card_text"><strong>Заказчик:</strong> {basketData?.Order.Creator.fio || "Не указан"}</p>
                    <p className="card_text"><strong>Приоритет:</strong> {basketData?.Order?.priority || "Не указан"}</p>
                    <div className="basket-actions">
                        <button onClick={handleConfirm} className="btn card_text cart_btn card_button">Оформить заявку</button>
                        <button onClick={handleDeleteBasket} className="btn card_text cart_btn card_button">Удалить заявку</button>
                    </div>
                </div>
            </div>
        </>
    );
};