import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderPage.css"; // Подключаем стили корзины
import { Navbar } from "./Navbar";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { OrderResponse } from "../modules/MyInterface";
import { getOrderByID } from "../modules/MyApiTexts";
import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "../modules/MyRoutes";
import { setId, fetchOrderBasketData, confirmOrder, deleteOrder, deleteProductFromOrder  } from "../slices/orderSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export const OrderPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const [basketData, setBasketData] = useState<OrderResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        console.log(navigate)
        if (id) {
            dispatch(fetchOrderBasketData(Number(id)));
        }
    }, [id, dispatch]);

    const handleConfirm = () => {
        if (id) dispatch(confirmOrder(Number(id)));
    };

    const handleDeleteBasket = () => {
        if (id) dispatch(deleteOrder(Number(id)));
    };

    const handleDeleteProduct = (text_id: number) => {
        if (id) dispatch(deleteProductFromOrder({ order_id: Number(id), text_id }));
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