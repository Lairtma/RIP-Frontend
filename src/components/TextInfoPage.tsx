import { FC, useEffect, useState } from "react"
import { BreadCrumbs } from "./BreadCrumbs"
import { ROUTE_LABELS, ROUTES } from "../modules/MyRoutes"
import { getTextById } from "../modules/MyApiTexts"
import { Text } from "../modules/MyInterface"
import { useParams  } from "react-router-dom"
import "./TextInfoPage.css"
import { Navbar } from "./Navbar";


export const TextInfoPage: FC = () => {

    const [textInfo, setTextInfo] = useState<Text>()
    const { text_id } = useParams()
    let image: string = ''

    useEffect(() => {
        if (text_id) {
            getTextById(text_id).then((text) => {
                setTextInfo(text);
            });
        }

        { text_id && console.log(text_id) }

    }, [text_id])

    if (textInfo?.img === undefined || textInfo.img == "") { image = "../no-image-text.png" }
    else { image = textInfo.img } // Corrected: Removed ${} from around textInfo.img


    return (
        <>


            <Navbar />
            <div className="MP_breadcrumbs">
                <BreadCrumbs
                    crumbs={[
                        { label: ROUTE_LABELS.TEXTS, path: ROUTES.TEXTS },
                        { label: textInfo?.text || "Текст" },
                    ]}
                />
            </div>

            {textInfo ? (

                <div className="cards_one">
                    <div className="card_one">
                        <img src={image} className="card_img_one" />
                            <div className="info_one">
                                <pre className="card_text_one text">{textInfo.text.replace("/n", "\n")}</pre>
                                <select name="type" id="type" className="selector_one btn_one text_one">
                                    {textInfo.enc ? (
                                        <option value="encryption">Изначальный</option>
                                    ) : (
                                        <option value="decryption">Зашифрованный</option>
                                    )}
                                </select>
                                <p className="text_one description_one">Длина в байтах: {textInfo.byte_len}</p>
                            </div>
                    </div>
                </div>

            ) : (
                <h1> No info </h1>
            )}

        </>
    )
}

