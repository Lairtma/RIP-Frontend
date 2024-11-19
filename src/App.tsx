import { WelcomePage } from './components/WelcomePage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./modules/MyRoutes";
import { MainPageTexts } from './MainPageTexts';
import { TextInfoPage } from './components/TextInfoPage';

function App() {
  return (
    <BrowserRouter basename="/RIP-Frontend">
    <Routes>
      <Route path={ROUTES.HOME} index element={<WelcomePage />} />
      <Route path={ROUTES.TEXTS} element={<MainPageTexts />} />
      <Route path={`${ROUTES.TEXTS}/:text_id`} element={<TextInfoPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
