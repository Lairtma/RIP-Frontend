import "./MainPageTexts.css"
import { BreadCrumbs } from "./components/BreadCrumbs"
import { ROUTES, ROUTE_LABELS } from "./modules/MyRoutes"
import FinderItem from "./components/FinderItem"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTextByType } from "./modules/MyApiTexts";
import { Text } from "./modules/MyInterface";
import { OneTextItem } from "./components/OneTextItem";
import { Navbar } from "./components/Navbar";



export const MainPageTexts = () => {

    const [searchType, STT] = useState('')

    const [texts, SetText] = useState<Text[]>([])
    const navigate = useNavigate();


    useEffect(() => {
        getTextByType(searchType).then((test) => {
            SetText(test.Texts);
        });
    }, [searchType])


    const cardClickHandler = (text_id: number) => {

        navigate(`${ROUTES.TEXTS}/${text_id}`);

    }

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
          navigator.serviceWorker
            .register("/RIP-frontend/serviceWorker.js")
            .then(res => console.log("service worker registered", res))
            .catch(err => console.log("service worker not registered", err))
        })
      }

    return (

        <header>
            <div>
                <Navbar />
            </div>

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