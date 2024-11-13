import { FC } from "react";
import { Text } from "../modules/MyInterface";
import "./OneTextItem.css";

interface OneTextItemTypes {
    text: Text;
    btnClickHandler: () => void;
}

export const OneTextItem: FC<OneTextItemTypes> = ({
    text,
    btnClickHandler,
}: OneTextItemTypes) => {
    let image: string = "";

    if (text.img === undefined || text.img === "") {
        image = "no-image-text.png";
    } else {
        image = text.img;
    }

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
            </div>
        </div>
    );
};

