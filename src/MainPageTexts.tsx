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
import { setfilteredTexts  } from "./slices/dataSlice";
import { RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";


export const MainPageTexts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Извлекаем данные из Redux
    const { textType, filteredTexts } = useSelector((state: RootState) => state.search);
    
    // Состояние для отображения продуктов
    const [texts, setTexts] = useState<Text[]>(filteredTexts || []); // Изначально используем filteredProducts

    useEffect(() => {
        // Если фильтрованные продукты уже есть в Redux, их можно сразу отобразить
        if (filteredTexts.length > 0) {
            setTexts(filteredTexts);
        } else {
            // Если нет фильтрованных продуктов, загружаем все
            getTextByType("").then((result) => {
                setTexts(result.Texts); // Заменяем на правильный тип данных
            });
        }
    }, [filteredTexts]); // Перезапускаем useEffect, если filteredProducts изменились

    useEffect(() => {
        getTextByType(textType).then((test) => {
            dispatch(setfilteredTexts(test.Texts));
        });
    }, [textType])

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
                    TextType={textType}
                    dispatch={dispatch}
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