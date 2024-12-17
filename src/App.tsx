import { WelcomePage } from './components/WelcomePage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./modules/MyRoutes";
import { MainPageTexts } from './MainPageTexts';
import { TextInfoPage } from './components/TextInfoPage';
import { AuthPage } from './components/AuthPage';
import { RegisterPage } from './components/RegisterPage';
import { ProfilePage } from './components/ProfilePage';
import { OrderPage } from './components/OrderPage';
import { AllRequestPage } from './components/AllRequestsPage';
import { useEffect } from 'react';


function App() {

  useEffect(() => {
     if ((window as any).__Tauri__?.tauri) {
       const { invoke } = (window as any).__Tauri__.tauri;
       invoke('create')
         .then((response: any) => console.log(response))
         .catch((error: any) => console.log(error));
     } else {
       console.error("Tauri не инициализирован.");
     }
   }, []);

  return (
    <BrowserRouter basename="/">
    <Routes>
      <Route path={ROUTES.HOME} index element={<WelcomePage />} />
      <Route path={ROUTES.TEXTS} element={<MainPageTexts />} />
      <Route path={ROUTES.LOGIN} element={<AuthPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTES.REQUESTS} element={<AllRequestPage />} />
      <Route path={`${ROUTES.ORDER}/:id`} element={<OrderPage />} />
      <Route path={`${ROUTES.TEXTS}/:text_id`} element={<TextInfoPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
