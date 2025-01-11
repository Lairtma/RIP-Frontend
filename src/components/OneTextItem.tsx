import { FC } from "react";
import { Text } from "../modules/MyInterface";
import "./OneTextItem.css";
import { useDispatch } from 'react-redux'; // Используем useDispatch для получения функции dispatch
import { addTextToOrder } from "../modules/thunks/addTextToOrderThunk"; // Импорт вашего thunks

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
    const dispatch = useDispatch(); // Используем useDispatch для получения функции dispatch

    const handleAddText = async () => {
        if (!token) {
            console.error("Токен отсутствует");
            return;
        }

        try {
            //@ts-ignore
            dispatch(addTextToOrder({ textId: (text.id), token }));
            console.log("Текст успешно добавлен в запрос");
            await checkAndUpdateOrderID();
        } catch (err) {
            console.error("Произошла ошибка при добавлении текста:", err);
        }
    };

    return (
        <div className="card">
            <div className="info">
                <img src={text.img} className="card_img" alt="Text Image" />
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

