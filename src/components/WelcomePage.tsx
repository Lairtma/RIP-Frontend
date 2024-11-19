import "./WelcomePage.css"
import { ROUTES } from "../modules/MyRoutes";
import { Link } from "react-router-dom";


export const WelcomePage = () => {


    return (
        <>
        <div className="HP_mainDiv"> 
            <h1> Шифрование с обнаружение ошибки </h1>
            <h2> На нашем сайте вы сможете с лёгкость зашифровать и расшифровать текст любой сложности с различнымит типами обноружения ошибки </h2>
            <Link to={ROUTES.TEXTS}>
                <button  className="main-button">Узнать больше</button>
            </Link>
        </div>
        </>
    )


}