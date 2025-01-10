import { FC } from "react";
import { Text } from "../modules/MyInterface";
import "./OneTextItem.css";
import { api } from "../api"; // Импорт API

interface OneTextItemTypes {
    text: Text;
    btnClickHandler: () => void;
    checkAndUpdateOrderID: () => Promise<void>;
}


export const OneTextItem: FC<OneTextItemTypes> = ({
    text,
    btnClickHandler,
    checkAndUpdateOrderID
}: OneTextItemTypes) => {
    const token = localStorage.getItem("token");
    let image: string = "";

    if (text.img === undefined || text.img === "") {
        image = "no-image-text.png";
    } else {
        image = text.img;
    }

    const handleAddText = async () => {
        if (!token) {
            console.error("Токен отсутствует");
            return;
        }

        try {
            // Проверяем и обновляем milkRequestID, если нужно

            const response = await api.api.textToOrderCreate(
                String(text.id),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Текст успешно добавлен в заявку:", response.data);
            await checkAndUpdateOrderID();
        } catch (err: any) {
            if (err.response?.data?.message) {
                console.error("Ошибка при добавлении текста:", err.response.data.message);
            } else {
                console.error("Произошла неизвестная ошибка:", err);
            }
        }
    };


    return (
        <div className="card">
            <div className="info">
                <img src={image} className="card_img" alt="Text Image" />
                <p className="card_text text_card">
                    {text.enc ? "Изначальный" : "Закодированный"}
                </p>
                <br />
                <pre className="card_text text_card">{text.text.replace("/n", "\n")}</pre>
            </div>
            <div className="down">
                <button onClick={btnClickHandler} className="card_button btn text_card">
                    Подробнее
                </button>
                {token && (
                        <button onClick={handleAddText} className="card_button btn text_card" type="button">Добавить</button>
                    )}
            </div>
        </div>
    );
};

