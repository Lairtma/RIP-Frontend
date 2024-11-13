import "./MainPageTexts.css"
import { BreadCrumbs } from "./components/BreadCrumbs"
import { ROUTES, ROUTE_LABELS } from "./modules/MyRoutes"
import FinderItem from "./components/FinderItem"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTextById, getTextByType } from "./modules/MyApiTexts";
import { Text, ApiResponse } from "./modules/MyInterface";
import { OneTextItem } from "./components/OneTextItem";
import { MyOwnHeader } from "./components/MyOwnHeader";



export const MainPageTexts = () => {

    const [searchType, STT] = useState('')

    const [texts, SetText] = useState<Text[]>([])
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        getTextByType(searchType).then((test) => {
            SetText(test.Texts);
        });
    }, [searchType])

    const onSubmitFinderHandler = () => {

        STT('')

    }

    const cardClickHandler = (text_id: number) => {

        navigate(`${ROUTES.TEXTS}/${text_id}`);

    }

    return (

        <header>

            <div className="MP_breadcrumbs">
                <BreadCrumbs
                    crumbs={[{ label: ROUTE_LABELS.TEXTS }]}
                />
            </div>



            <div className="MP_Finder">

                <FinderItem
                    TextType={searchType}
                    setTextType={STT}
                />

            </div>

            <div className="cards">

                {Array.isArray(texts) && texts.map(text => (
                    <OneTextItem
                        text={text}
                        key={text.id}
                        btnClickHandler={() => cardClickHandler(text.id)}
                    />
                ))}

            </div>



        </header>

    )


}